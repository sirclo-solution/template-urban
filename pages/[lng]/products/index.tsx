/* library package */
import { 
  FC, 
  useState, 
  useEffect 
} from 'react'
import Router from 'next/router'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { 
  Products, 
  ProductSort, 
  useI18n 
} from '@sirclo/nexus'
import dynamic from 'next/dynamic'

/* library template */
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
import useQuery from 'lib/useQuery'
import useWindowSize from 'lib/useWindowSize'

/* component */
import SideMenu from 'components/SideMenu/SideMenu'
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import ProductFilterComponent from 'components/ProductFilter'

const EmptyComponent = dynamic(() => import('components/EmptyComponent/EmptyComponent'))

/* styles */
import styleProducts from 'public/scss/pages/Products.module.scss'
import styles from 'public/scss/components/ProductsComponent.module.scss'
import stylesSort from 'public/scss/components/ProductSort.module.scss'

/* locales */
import locales from 'locales'

export const placeholder = {
  placeholderImage: styles.products_placeholder,
  placeholderList: styles.products_placeholderList,
}

const placeholderSort = {
  placeholderImage: stylesSort.placeholder,
  placeholderList: stylesSort.placeholderList,
}

export const classesProducts = {
  productContainerClassName: `products_container ${styles.products_productContainer}`,
  stickerContainerClassName: styles.products_stickerContainer,
  outOfStockLabelClassName: `${styles.products_label} ${styles.products_outOfStockLabel}`,
  saleLabelClassName: `${styles.products_label} ${styles.products_saleLabel}`,
  comingSoonLabelClassName: `${styles.products_label} ${styles.products_comingSoonLabel}`,
  openOrderLabelClassName: `${styles.products_label} ${styles.products_openOrderLabel}`,
  preOrderLabelClassName: `${styles.products_label} ${styles.products_preOrderLabel}`,
  newLabelClassName: `${styles.products_label} ${styles.products_newLabel}`,
  productImageContainerClassName: styles.products_productImageContainer,
  productImageClassName: styles.products_productImage,
  productLabelContainerClassName: styles.products_productLabelContainer,
  productTitleClassName: styles.products_productTitle,
  productPriceClassName: styles.products_productPrice,
  salePriceClassName: styles.products_salePrice,
  priceClassName: styles.products_price,
}

const classesProductSort = {
  sortClassName: stylesSort.sort,
  sortOptionsClassName: stylesSort.sortOptions,
  sortOptionButtonClassName: stylesSort.sortOptionButton,
  sortActiveClassName: stylesSort.sortActive
}

const ProductsPage: FC<any> = ({
  lng,
  lngDict,
  brand
}) => {
  const i18n: any = useI18n()
  const linksBreadcrumb = [i18n.t("header.home"), i18n.t("product.products")]
  const layoutProps = {
    lngDict, i18n, lng, brand,
    SEO: { title: i18n.t("product.title") },
    withBack: false,
    titleSeo: i18n.t("product.title")
  }

  const size = useWindowSize();

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const handleFilter = (selectedFilter: any) => setFilterProduct(selectedFilter)
  const resetFilter = () => Router.replace(`/${lng}/products`)
  
  const [filterProduct, setFilterProduct] = useState({})
  const categories: string = useQuery('categories')

  const [currPage, setCurrPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 12,
    totalItems: 0,
  });

  const handleShowFilter = () => {
    setShowFilter(!showFilter)
    setShowSort(false)
  }
  const handleShowSort = () => {
    setShowSort(!showSort)
    setShowFilter(false)
  }

  const totalPage = Math.ceil(pageInfo.totalItems / pageInfo.itemPerPage);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    setCurrPage(0);
  }, [filterProduct, categories]);

  const handleScroll = () => {
    const lastItem = document.querySelector(
      ".products_container:last-of-type"
    ) as HTMLElement;

    if (lastItem) {
      const lastItemOffset = lastItem.offsetTop + lastItem.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastItemOffset) {
        if (currPage < totalPage - 1) setCurrPage(currPage + 1);
      }
    }
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const propsProduct = {
    classes: classesProducts,
    getPageInfo: (pageInfo: any) => setPageInfo(pageInfo),
    fullPath: `product/{id}`,
    pathPrefix: `product`,
    lazyLoadedImage: false,
    thumborSetting: {
      width: 512,
      format: "webp",
      quality: 85,
    },
    itemPerPage: 12,
    collectionSlug: categories,
    filter: filterProduct,
    withSeparatedVariant: true,
    loadingComponent:
      [0, 1, 2, 3, 4, 5, 6, 7].map((_, i) => (
        <div key={i}>
          <Placeholder classes={placeholder} withImage withList />
        </div>
      ))
  }

  return (
    <Layout {...layoutProps}>
      <section className={styleProducts.products_breadcumb}>
        <Breadcrumb title={i18n.t("product.title")} links={linksBreadcrumb} lng={lng} />
      </section>

      <LazyLoadComponent>
        <>
          <section
            className={
              `container my-2 
          ${pageInfo.totalItems !== 0 ? 'pb-4' : ""}
          ${pageInfo.totalItems !== 0 ? styles.productsComponent_lastSection : ""}
          
        `}
          >
            <div className={`
          ${pageInfo.totalItems === 0 && "mb-0"}
          
        `}>
              <>
                <div className={styles.productsComponent_action}>
                  <button className={styles.productsComponent_actionItem} onClick={handleShowFilter}>
                    {i18n.t("product.filter")}
                  </button>
                  <button className={`${styles.productsComponent_actionItem}`} onClick={handleShowSort}>
                    {i18n.t("product.sort")}
                  </button>
                </div>
                <div className={styles.productsComponent_showResetContainer}>
                  <p className={styles.productsComponent_show}>
                    {i18n.t("product.show")}
                    {" "}{pageInfo.totalItems}{" "}
                    {i18n.t("product.result")}
                  </p>
                
                    <button className={`${styles.productsComponent_reset}`} onClick={resetFilter}>
                      {i18n.t("product.reset")}
                    </button>
                  
                </div>
              </> 
                <div
                  className={`${styles.productsComponent_grid} ${styles.productsRecomendation} ${styles.productsComponent_gridTree}
                 ${'mt-0 pt-0'}
                ${pageInfo.totalItems === 0 && "pb-0"}    
              `}
                >
                  {Array.from(Array(currPage + 1)).map((_, i) => (
                    <Products
                      key={i}
                      pageNumber={i}
                      {...propsProduct}
                    />
                  ))
                  }

                  <button onClick={scrollToTop} className={styles.productsComponent_goToTop}>
                    <div className={styles.productsComponent_arrowUp}></div>
                  </button>
                </div>
            </div >
            {showFilter &&
            <SideMenu
              withClose
              withTitle
              title={i18n.t("product.filter")}
              openSide={showFilter}
              toogleSide={handleShowFilter}
              positionSide={size.width < 765 ? 'left' : 'right'}
            >
              <ProductFilterComponent
                lng={lng}
                i18n={i18n}
                handleFilter={handleFilter}
                withApply
              />
            </SideMenu>
          }
          {showSort &&
            <SideMenu
              withClose
              withTitle
              title={i18n.t("product.sort")}
              openSide={showSort}
              toogleSide={handleShowSort}
              positionSide={size.width < 765 ? 'left' : 'right'}
            >
              <ProductSort
                classes={classesProductSort}
                errorComponent={<p>{i18n.t("global.error")}</p>}
                loadingComponent={
                  <div className={stylesSort.sort} >
                    {
                      [0, 1, 2, 3].map((_, i) => (
                        <Placeholder key={i} classes={placeholderSort} withList />
                      ))
                    }
                  </div>
                }
              />
            </SideMenu>
          }
          </section >
          {pageInfo.totalItems === 0 && 
            <EmptyComponent
              logo={<div className={styles.products_iconEmpty} />}
              classes={{ emptyContainer: styles.products_emptyContainer }}
              desc={i18n.t("product.isEmpty")}
            />
          }
        </>
      </LazyLoadComponent>
    </Layout>
  );
};
export const getServerSideProps = async ({
  req,
  res,
  params
}) => {

  const allowedUri: Array<string> = ['en', 'id', 'graphql', 'favicon.ico'];

  if (allowedUri.indexOf(params.lng.toString()) == -1) {
    const cookies = parseCookies(req);

    res.writeHead(307, {
      Location: cookies.ACTIVE_LNG ? '/' + cookies.ACTIVE_LNG + '/' + params.lng : '/id/' + params.lng
    });

    res.end();
  }

  const lngDict = locales(params.lng) || {}

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
}

export default ProductsPage
