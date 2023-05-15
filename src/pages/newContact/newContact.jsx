import './newContact.scss';
import ContactForm from '../../components/form/form';

function NewContact() {
  const initialValues = {
      contactName: '',
      phoneNumber: '',
      email: '',
      job: '',
      group: '',
      avatar: '',
      gender: 'female',
      favourite: false
    }

  return (
    <div className="new-contact">
      <h2>New Contact</h2>
      <ContactForm initialValues={initialValues}></ContactForm>
    </div>
  )
}

export default NewContact;
