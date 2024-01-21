import style from './style.module.css'

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={style.button} />
}
