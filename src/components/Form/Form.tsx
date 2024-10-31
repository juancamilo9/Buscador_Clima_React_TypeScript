import { useState } from 'react';
import { countries } from '../../data/conutries'
import styles from './Form.module.css';
import type { SearchType } from '../../types';
import Alert from '../Alert/Alert';


const Form = () => {

  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })

  const [alert, setAlert] = useState('')

  const handleChage = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
    setSearch({
      ...search,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if (Object.values(search).includes('')){
      setAlert('Los campos del formulario no pueden ir vacios')
      return
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert&&<Alert>{alert}</Alert>
      }
      <div className={styles.field}>
        <label htmlFor="city">Ciduda:</label>
        <input
          type="text"
          name="city"
          id='city'
          placeholder='Ciudad'
          value={search.city}
          onChange={handleChage}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Pais:</label>
        <select
          name="country"
          id='country'
          value={search.country}
          onChange={handleChage}
        >
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
