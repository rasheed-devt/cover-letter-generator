import { useState, React } from 'react';
import axios from 'axios';
import styles from "../styles/Generate.module.css";
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    skills: '',
    position: '',
    experience: ''
  });
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult('');

    try {
      const result = await axios.post('/api/generate', formData);
      setResult(result.data);
    } catch (err) {
      setError("Timeout. Kindly retry");
    }

    setIsLoading(false);
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }

    toast.success("Copied!", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "copy-id",
      pauseOnHover: false,
    });
  }

  const errorToast = () => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "error-id",
      pauseOnHover: false,
    });
  }

  return (
    <>
      <div className={styles.container}>
        <Header />
        <ToastContainer />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <p>Generate a <span>Cover Letter</span> in seconds.</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Company:
              <input type="text" name="company" value={formData.company} onChange={handleChange} />
            </label>
            <br />
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
              Position:
              <input type="text" name="position" value={formData.position} onChange={handleChange} />
            </label>
            <br />
            <label>
              Skills:
              <textarea name="skills" placeholder='Outline relevant skills' value={formData.skills} onChange={handleChange} />
            </label>
            <br />
            <label>
              Years of Experience:
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
            </label>
            <br />
            <div className={styles.buttons}>
              <Button text={"Generate"} />
              {isLoading && <Loader />}
            </div>
          </form>
          <div className={styles.bottom}>
            {error && errorToast()}
            {result && 
            <div className={styles.result}>
              <button className={styles.button} onClick={handleCopy}>Copy</button>
              {result}
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}


export default App;