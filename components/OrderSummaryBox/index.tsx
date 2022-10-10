/* library package */
import { FC, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import {
  OrderSummary,
  CartDetails,
  PrivateComponent
} from '@sirclo/nexus'

/* library component */
import useWindowSize from 'lib/useWindowSize'

/* component */
import Placeholder from 'components/Placeholder'
import Popup from 'components/Popup/Popup'
import Icon from 'components/Icon/Icon'
import Loader from 'components/Loader/Loader'

/* styles */
import styles from 'public/scss/components/OrderSummary.module.scss'
import stylesCartDetails from 'public/scss/components/CartDetails.module.scss'
import stylesPriceBreakdown from 'public/scss/components/PriceBreakdown.module.scss'
import stylesPopup from 'public/scss/components/PopUpVoucherCoupon.module.scss'
import stylesErrorAddToCart from 'public/scss/components/ErrorAddToCart.module.scss'

export const classesOrderSummary = {
  containerClassName: styles.container,
  headerClassName: styles.header,
  subTotalClassName: styles.subTotal,
  subTotalTextClassName: styles.subTotalText,
  subTotalPriceClassName: styles.subTotalPrice,
  footerClassName: styles.footer,
  continueShoppingClassName: styles.continueShopping,
  pointEarnedBannerClassName: styles.pointEarnedBanner,
  submitButtonClassName: styles.submitButton,
  expandButtonClassName: stylesPriceBreakdown.expandButton,
  expandedDivClassName: stylesPriceBreakdown.expandedDiv,
  deductionPriceClassName: stylesPriceBreakdown.deductionPrice,

  /* applied coupon and point */
  voucherTextClassName: styles.voucherText,
  voucherButtonAppliedClassName: styles.voucherButtonApplied,
  voucherButtonClassName: styles.voucherButton,
  voucherAppliedTextClassName: styles.voucherAppliedText,
  voucherAppliedIconClassName: styles.voucherAppliedIcon,
  voucherButtonRemoveClassName: styles.voucherButtonRemove,
  voucherIconClassName: styles.voucherIcon,
  pointsTextClassName: styles.pointsText,
  pointsButtonClassName: styles.pointsButton,
  pointsButtonAppliedClassName: styles.voucherButtonApplied,
  pointsIconClassName: styles.pointsIcon,
  pointsAppliedTextClassName: styles.voucherAppliedText,

  /* Pop Up */
  popupClassName: stylesPopup.popup,
  closeButtonClassName: stylesPopup.closeButton,
  voucherContainerClassName: stylesPopup.voucherContainer,
  pointsContainerClassName: `${stylesPopup.pointsContainer} ${stylesPopup.pointsContainer__noGradient}`,
  voucherFormContainerClassName: stylesPopup.voucherFormContainer,
  voucherFormClassName: `${stylesPopup.voucherForm}`,
  voucherInputClassName: "form-control",
  /* Voucher  up */
  voucherTitleInputClassName: stylesPopup.voucherTitleInput,
  voucherSubTitleInputClassName: stylesPopup.voucherSubTitleInput,
  voucherInputContainerClassName: stylesPopup.voucherInputContainer,
  voucherSubmitButtonClassName: stylesPopup.voucherFormSubmit,
  voucherListClassName: stylesPopup.voucherList,
  voucherValidListClassName: stylesPopup.voucherValidList,
  voucherInvalidListClassName: stylesPopup.voucherInvalidList,
  voucherListHeaderClassName: stylesPopup.voucherListHeader,
  voucherListItemsClassName: stylesPopup.voucherListItems,
  voucherClassName: stylesPopup.voucher,
  voucherListHeaderIconClassName: stylesPopup.voucherListHeaderIcon,
  voucherTitleClassName: stylesPopup.voucherTitle,
  voucherBankLogoContainerClassName: stylesPopup.voucherBankLogoContainer,
  voucherBankLogoImageClassName: stylesPopup.voucherBankLogoImage,
  voucherShipperLogoContainerClassName: stylesPopup.voucherShipperLogoContainer,
  voucherShipperLogoImageClassName: stylesPopup.voucherShipperLogoImage,
  voucherDetailClassName: stylesPopup.voucherDetail,
  voucherDetailHeaderClassName: stylesPopup.voucherDetailHeader,
  voucherDetailCodeClassName: stylesPopup.voucherDetailCode,
  voucherDetailTitleClassName: stylesPopup.voucherDetailTitle,
  voucherDetailDescClassName: stylesPopup.voucherDetailDesc,
  voucherDetailEstimateClassName: stylesPopup.voucherDetailEstimate,
  voucherDetailEstimateDescClassName: stylesPopup.voucherDetailEstimateDesc,
  voucherDetailViewDetailsClassName: stylesPopup.voucherDetailViewDetails,
  voucherDetailApplyedClassName: stylesPopup.voucherDetailApplied,
  voucherDetailInvalidClassName: stylesPopup.voucherDetailInvalid,
  voucherShowMoreContainerClassName: stylesPopup.voucherShowMoreContainer,
  voucherShowMoreButtonClassName: stylesPopup.voucherShowMoreButton,
  voucherDetailPopUpContainerClassName: stylesPopup.voucherDetailPopUpContainer,
  voucherDetailPopUpBodyClassName: stylesPopup.voucherDetailPopUpBody,
  voucherDetailPopUpHeaderClassName: stylesPopup.voucherDetailPopUpHeader,
  voucherDetailPopUpHeaderTitleClassName: stylesPopup.voucherDetailPopUpHeaderTitle,
  voucherDetailPopUpCloseClassName: stylesPopup.voucherDetailPopUpClose,
  voucherDetailPopUpDescContainerClassName: stylesPopup.voucherDetailPopUpDescContainer,
  voucherDetailPopUpTermsTitleClassName: stylesPopup.voucherDetailPopUpTermsTitle,
  voucherDetailPopUpTermsContainerClassName: stylesPopup.voucherDetailPopUpTermsContainer,
  voucherDetailPopUpDescDateClassName: stylesPopup.voucherDetailPopUpDescDate,
  voucherDetailPopUpCodeContainerClassName: stylesPopup.voucherDetailPopUpCodeContainer,
  voucherDetailPopUpCodeTitleClassName: stylesPopup.voucherDetailPopUpCodeTitle,
  voucherDetailPopUpCodeCopyContainerClassName: stylesPopup.voucherDetailPopUpCodeCopyContainer,
  voucherDetailPopUpCodeCopyTitleClassName: stylesPopup.voucherDetailPopUpCodeCopyTitle,
  voucherDetailPopUpCodeCopyButtonClassName: stylesPopup.voucherDetailPopUpCodeCopyButton,
  voucherDetailPopUpUseCouponClassName: stylesPopup.voucherDetailPopUpUseCoupon,

  /* point Pop-up */
  totalPointsClassName: stylesPopup.totalPoints,
  pointsFormContainerClassName: styles.pointsFormContainer,
  pointsFormClassName: stylesPopup.pointsForm,
  changePointsClassName: stylesPopup.changePoints,
  pointsSubmitButtonClassName: stylesPopup.pointsSubmitButton,
  pointsWarningClassName: stylesPopup.pointsWarning,
  pointsInsufficientClassName: stylesPopup.pointsInsufficient,
  pointValueClassName: stylesPopup.pointValue,
  pointLabelClassName: stylesPopup.pointLabel,
  numberOfPointsClassName: stylesPopup.numberOfPoints,
}

const classesCartDetails = {
  className: stylesCartDetails.container,
  cartHeaderClassName: stylesCartDetails.cartHeader,
  itemClassName: stylesCartDetails.item,
  itemImageClassName: stylesCartDetails.itemImage,
  itemTitleClassName: stylesCartDetails.itemTitle,
  titleClassName: stylesCartDetails.title,
  selectedVariantClassName: stylesCartDetails.selectedVariant,
  itemRegularPriceClassName: stylesCartDetails.itemRegularPrice,
  itemPriceClassName: stylesCartDetails.itemPrice,
  itemSalePriceClassName: stylesCartDetails.itemSalePrice,
  itemQtyClassName: stylesCartDetails.itemQty,
  qtyBoxClassName: stylesCartDetails.qtyBox,
  changeQtyButtonClassName: stylesCartDetails.changeQtyButton,
  itemNoteClassName: stylesCartDetails.itemNote,
  itemAmountClassName: stylesCartDetails.itemAmount,
  itemRegularAmountClassName: stylesCartDetails.itemRegularAmount,
  itemRemoveClassName: stylesCartDetails.itemRemove,
  cartBodyClassName: stylesCartDetails.cartBody,
  selectedVariantContainerClassName: stylesCartDetails.selectedVariantContainer,
  removeButtonClassName: stylesCartDetails.removeButton,
  // hidden
  itemEditClassName: 'd-none',
  cartFooterClassName: 'd-none'
}

const classesCartPlaceholder = {
  placeholderList: stylesCartDetails.placeholderList,
  placeholderImage: stylesCartDetails.placeholderImage,
}

type iProps = {
  i18n: any
  lng: string
  page: "cart"
  | "place_order"
  | "shipping_method"
  | "payment_method"
  withCartDetails?: boolean
  withOrderSummary?: boolean
}
const OrderSummaryBox: FC<iProps> = ({
  i18n,
  lng,
  page,
  withCartDetails,
  withOrderSummary = true
}) => {

  const size = useWindowSize()
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)
  const toogleErrorAddToCart = () => setShowModalErrorAddToCart(!showModalErrorAddToCart)

  const icons = {
    expand: <Icon.orderSummary.expand size={20} />,
    collapse: <Icon.orderSummary.collapse size={20} />,
    voucher: <Icon.orderSummary.voucher />,
    voucherApplied: <Icon.orderSummary.voucherApplied />,
    voucherRemoved: <Icon.orderSummary.voucherRemoved />,
    points: <Icon.orderSummary.points />,
    pointsApplied: <Icon.orderSummary.pointsApplied />,
    close: <Icon.orderSummary.close size={20} />,
    copyIcon: <Icon.thankYou.copy />
  }

  const getNewclassesCartDetails = () => {
    if (lng === "en") return {
      ...classesCartDetails,
      qtyBoxClassName: `${stylesCartDetails.qtyBox} en`,
    }

    return classesCartDetails
  }

  return (
    <>
      {withCartDetails &&
        <section className={stylesCartDetails.section}>
          <div className={stylesCartDetails.header}>
            <h2 className={stylesCartDetails.title}>
              {i18n.t("cart.title")}
            </h2>
            <Link href="/lng/cart" as={`/${lng}/cart`}>
              <p className={stylesCartDetails.changeCart}>
                {i18n.t("orderSummary.changeCart")}
              </p>
            </Link>
          </div>
          <CartDetails
            currency="IDR"
            withSeparatedVariant={true}
            itemRedirectPathPrefix="product"
            onErrorMsg={(msg) => toast.error(msg)}
            classes={getNewclassesCartDetails()}
            isEditable
            withProductNote
            removeIcon={<Icon.CartDetails.removeIcon />}
            thumborSetting={{
              width: 200,
              format: "webp",
              quality: 85,
            }}
            productNoteButtonElement={{
              filled: <span>{i18n.t("cart.change")}</span>,
              save: <span>{i18n.t("cart.save")}</span>,
              empty: (
                <>
                  <span className={stylesCartDetails.itemEditNote} />
                  <span>{i18n.t("cart.addNote")}</span>
                </>
              )
            }}
            loadingComponent={
              [0, 1].map((_, i) => (
                <div>
                  <div key={i} className={stylesCartDetails.placeholderContainer}>
                    <Placeholder
                      classes={classesCartPlaceholder}
                      withImage
                      withList
                      listMany={3}
                    />
                  </div>
                </div>
              ))
            }
          />
        </section>
      }

      {withOrderSummary &&
        <>
          <OrderSummary
            isAccordion
            classes={{
              ...classesOrderSummary,
              footerClassName: page !== "cart" && size.width > 767
                ? "d-none"
                : classesOrderSummary.footerClassName,
              containerClassName: page === "cart" ? styles.containerRelative : styles.container
            }}
            currency="IDR"
            submitButtonLabel={i18n.t("orderSummary.placeOrder")}
            page={page}
            onSuccessCopyCodeCoupon={() => toast.success(i18n.t('coupon.successCopyCode'))}
            onErrorMsg={() => toast.error(i18n.t("global.error"))}
            onErrorMsgCoupon={(msg) => toast.error(msg)}
            onAddressInvalid={(e) => toast.error(e)}
            icons={icons}
            emptyComponentCoupon={
              <div className={stylesPopup.voucherEmpty}>
                <span className={stylesPopup.voucherEmptyIcon}></span>
                <p>{i18n.t("coupon.empty")}</p>
              </div>
            }
            couponLoadingComponent={
              <div className={stylesPopup.voucherLoading}>
                <Loader color="text-dark" />
                <p>{i18n.t("global.loading")}</p>
              </div>
            }
            pointsLoadingComponent={
              <p className="m-0 p-0">{i18n.t("global.loading")}</p>
            }
          />
          {page === "cart" &&
            <PrivateComponent
              Auth={<></>}
              NoAuth={
                <Link href="/[lng]/login" as={`/${lng}/login`}>
                  <p className={styles.registerNow}>
                    {i18n.t("cart.registerNow")}
                  </p>
                </Link>
              }
            />
          }
        </>
      }
      {showModalErrorAddToCart &&
        <Popup
          setPopup={toogleErrorAddToCart}
          mobileFull={false}
        >
          <div className={stylesErrorAddToCart.popupErrorContainer}>
            <h3 className={stylesErrorAddToCart.popupErrorTitle}>{i18n.t("cart.errorSKUTitle")}</h3>
            <p className={stylesErrorAddToCart.popupErrorDesc}>{i18n.t("cart.errorSKUDesc")} </p>
            <button
              className={stylesErrorAddToCart.backBtn}
              onClick={toogleErrorAddToCart}
              data-identity="ordersummary-back-btn"
            >
              {i18n.t("global.back")}
            </button>
          </div>
        </Popup>
      }
    </>
  )
}

export default OrderSummaryBox
