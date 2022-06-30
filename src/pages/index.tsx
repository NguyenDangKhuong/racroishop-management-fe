import Header from '../components/Header'
import { renderPageWithLayout } from '../utils/renderPageWithLayout'

const Home = () => {
  return <>{renderPageWithLayout(<Header />)}</>
}

export default Home
