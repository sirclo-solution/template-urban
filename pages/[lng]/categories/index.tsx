/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useI18n } from '@sirclo/nexus'

/* library template */
import { useBrandCommon } from 'lib/useBrand'

/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import ProductCategoryComponent from 'components/ProductCategoryComponent/ProductCategoryComponent'

const CategoriesPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const i18n: any = useI18n()
  const linksBreadcrumb = [i18n.t("header.home"), i18n.t("home.productCategory")]
  const layoutProps = {
    lngDict,
    i18n,
    lng,
    brand,
    SEO: {
      title: i18n.t("product.categories")
    },
    titleHeader: i18n.t("product.categories")
  }

  return (
    <Layout {...layoutProps}>
      <Breadcrumb
        lng={lng}
        title={i18n.t("home.productCategory")}
        links={linksBreadcrumb}
      />
      <section className="container">
        <ProductCategoryComponent
          i18n={i18n}
          lng={lng}
          page='categories'
        />
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ 
  req, 
  params 
}) => {
  const brand = await useBrandCommon(req, params)

  return {
    props: {
      ...brand
    }
  }
}

export default CategoriesPage
