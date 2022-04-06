import errorImg from '../../resources/img/error.gif';

export default function ErrorMessage() {
  return (
    <img src={errorImg} style={{display: 'block', width: '250px', height: '250px', margin: '0 auto', objectFit: 'contain'}} alt="" />
  )
}
