import Layout from '../components/Layout'

export const renderPageWithLayout = (children: JSX.Element) => (
  <Layout>{children}</Layout>
)
