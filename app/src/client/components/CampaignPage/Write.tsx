import React, { useEffect, useRef, useState } from "react";
import { DefaultJsonData } from "../../mails/default";
import { TemplateJsonData } from "../../mails/template";
import EmailEditor, { EditorRef } from 'react-email-editor';
import { Button } from "@nextui-org/react";
import { useQuery } from 'wasp/client/operations';
import { useLocation, useHistory } from 'react-router-dom';
import { createCampaign, getAllTasksByUser } from 'wasp/client/operations';
import { type User } from 'wasp/entities';

export default function Write({ user }: { user: User }) {
  const [loading, setLoading] = useState(true);
  const [jsonData, setJsonData] = useState<any>(DefaultJsonData);
  const [tempData, setTempData] = useState<any>(TemplateJsonData);
  const [emailData, setEmailData] = useState<any>(null);
  const emailEditorRef = useRef<EditorRef | any>(null);
  const { data: tasks, isLoading: isTasksLoading } = useQuery(getAllTasksByUser);
  const location = useLocation();
  const history = useHistory();

  // Parse the query parameters from the URL
  const searchParams = new URLSearchParams(location.search);
  const key1: any = searchParams.get('list');
  const key2 = searchParams.get('template');
  const key3 : any = searchParams.get('schedule');
  const key4: any = searchParams.get('name');
  const key5: any = searchParams.get('subject');

  useEffect(() => {
    if (!isTasksLoading && tasks) {
      setLoading(false);
    }
    if (key2 === 'new') {
      setEmailData(jsonData);
    } else {
      setEmailData(tempData);
    }
  }, [tasks, isTasksLoading, key2, jsonData, tempData]);

  // Generate dynamic merge tags based on the properties of the first task
  const dynamicMergeTags = tasks && key1 && tasks?.length ? Object.keys(tasks[0]).reduce((acc: any, key) => {
    acc[key] = {
      name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the key
      value: `{{${key}}}`,
    };
    return acc;
  }, {}) : {};

  const exportHtml = async () => {
    return new Promise((resolve) => {
      emailEditorRef.current?.editor.exportHtml((data: any) => {
        const { html } = data;
        resolve(html);
      });
    });
  };

  const onLoad = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.editor.loadDesign(emailData);
      emailEditorRef.current.editor.addEventListener('design:loaded', () => {
        emailEditorRef.current.editor.setMergeTags(dynamicMergeTags);
      });
    }
  };

  const onReady = () => {
    console.log('onReady');
    if (emailEditorRef.current) {
      emailEditorRef.current.editor.setMergeTags(dynamicMergeTags);
    }
  };

  const handleCampaign = async () => {
    console.log(key3);
    try {
      const html: any = await exportHtml();
      if (html) {
        const filteredTasks = tasks?.filter((task: any) => task.Tag === key1) || [];
        const to = filteredTasks.map((task: any) => task.email); // Assuming 'email' is the property in tasks

        if (to.length === 0) {
          throw new Error('No tasks found with the specified tag');
        }

        const cname = key4;
        const from: any = user.username;
        const subject = key5;
        const body = html;
        const tag = 'mail-tool';

        let schedule: any = null;
        if (key3) {
          // Convert key3 (ISO string) to Unix timestamp
        const scheduleDate = new Date(key3);
        const scheduleTimestamp = Math.floor(scheduleDate.getTime() / 1000);
       schedule = { sendAt: scheduleTimestamp };
        }

        const mergeTags : any = filteredTasks.map((task: any) => {
          const tags = Object.keys(task).reduce((acc: any, key) => {
            acc[`{{${key}}}`] = task[key];
            return acc;
          }, {});
          return { email: task.email, tags };
        });

        console.log("this is from write before campaign ",schedule)
        const campaign = await createCampaign({ name: cname, to, from, subject, body, tag, schedule , mergeTags });
        console.log('Campaign created:', campaign);
        history.push('/campaign'); 
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleCancel = () => {
    history.push('/campaign'); 
  };

  return (
    <div className="w-full h-full">
      {!loading && (
        <>
          <div className="w-screen">
            <div className="absolute ml-20 justify-center">
              <EmailEditor
                ref={emailEditorRef}
                minHeight={"90vh"}
                onLoad={onLoad}
                onReady={onReady}
              />
            </div>
          </div>
          <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
            <Button
              className="bg-transparent cursor-pointer flex items-center gap-1 text-black border border-[#00000048] text-lg rounded-lg"
              onClick={handleCancel}
            >
              <span className="opacity-[.7]">Cancel</span>
            </Button>
            <Button
              className="bg-[#000] text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
              onClick={handleCampaign}
            >
              <span>Send</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
