import { useNavigate } from 'react-router-dom';
import { chatList } from '../data/dummyData';
import ContactSelection from '../components/ContactSelection';

function ContactSelectionPage() {
  const navigate = useNavigate();

  return (
    <ContactSelection 
      isOpen={true}
      onClose={() => navigate(-1)}
      contacts={chatList}
    />
  );
}

export default ContactSelectionPage;
