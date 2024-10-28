import { countries } from '../../data/conutries'
import styles from './Form.module.css';


const Form = () => {
  
  
  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="city">Ciduda:</label>
        <input type="text" name="city" id='city' placeholder='Ciudad'/>
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Pais:</label>
        <select  name="city" id='city'>
            <option value="">-- Seleccione un País -- </option>
            {countries.map(country => (
                <option 
                key={country.code} 
                value={country.code}
                >
                    {country.name}
                </option>
            )
            )} 
        </select>
      </div>

      <input type='submit' value="Cosnultar clima" className={styles.submit} />
    </form>
  )
}

export default Form
