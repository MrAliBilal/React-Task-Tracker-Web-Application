import { Link } from "react-router-dom"

const Footer = () => {
  return (
   
    <footer>
        <p>Copyright &copy; <a href="https://github.com/alibilal-1"><img src="/github-logo.png" alt="image"  height="18 px" /></a> <a href="https://github.com/alibilal-1"> AliBilal-1 </a> </p>
        <Link to="/about">About</Link>
    </footer>
  )
}

export default Footer