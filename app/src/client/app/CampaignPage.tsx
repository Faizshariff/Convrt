import { type User } from 'wasp/entities';
import CreateCampaignPage from '../components/CampaignPage/CreateCampaign';

export default function CampaignPage({ user }: { user: User }) {
 
  
    return (
      <div className='p-6 lg:mt-10 px-4 lg:px-8'>
        <CreateCampaignPage user={user} />
      </div>
    );
  }