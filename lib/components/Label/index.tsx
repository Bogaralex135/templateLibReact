import style from './style.module.css'

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={style.label} />
}
