import style from './style.module.css'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={style.input} />
}
