import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCloseFill,
  RiCoupon3Fill,
  RiCopperDiamondFill,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiDeleteBin2Line,
  RiCalendarLine,
  RiTimeLine,
  RiNotification2Fill,
  RiFacebookFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiWhatsappFill,
  RiMailFill,
  RiTelegramFill,
  RiCheckboxCircleFill,
  RiEyeCloseLine,
  RiEyeLine,
  RiQuestionFill,
  RiFileCopyLine
} from 'react-icons/ri'

import { GoPlus } from 'react-icons/go'
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronDown,
} from 'react-icons/fi'
import { BiCurrentLocation } from 'react-icons/bi'

const starIcon = () => {
  return( 
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.76224 0.731762C7.83707 0.501434 8.16293 0.501435 8.23776 0.731763L9.73998 5.35512C9.77345 5.45812 9.86944 5.52786 9.97775 5.52786H14.839C15.0812 5.52786 15.1819 5.83777 14.986 5.98012L11.0531 8.83751C10.9655 8.90117 10.9288 9.01401 10.9623 9.11702L12.4645 13.7404C12.5394 13.9707 12.2757 14.1622 12.0798 14.0199L8.14695 11.1625C8.05932 11.0988 7.94068 11.0988 7.85305 11.1625L3.92019 14.0199C3.72426 14.1622 3.46064 13.9707 3.53548 13.7404L5.0377 9.11702C5.07117 9.01401 5.03451 8.90117 4.94688 8.83751L1.01402 5.98012C0.818093 5.83777 0.918788 5.52786 1.16097 5.52786H6.02225C6.13056 5.52786 6.22655 5.45812 6.26002 5.35512L7.76224 0.731762Z" fill="#FF9800"/>
    </svg>
  )
}

const Icon: any = {
  arrowRight: RiArrowRightLine,
  arrowLeft: RiArrowLeftLine,
  chevronLeft: FiChevronLeft,
  chevronRight: FiChevronRight,
  chevronUp: FiChevronUp,
  chevronDown: FiChevronDown,
  RiCloseFill: RiCloseFill,
  coupon: RiCoupon3Fill,
  mapCenterIcon: BiCurrentLocation,
  article: {
    emptyIcon: RiQuestionFill
  },
  orderSummary: {
    expand: RiArrowDownSLine,
    collapse: RiArrowUpSLine,
    voucher: RiCoupon3Fill,
    voucherApplied: RiCoupon3Fill,
    voucherRemoved: RiCloseFill,
    points: RiCopperDiamondFill,
    pointsApplied: RiCopperDiamondFill,
    close: RiCloseFill,
  },
  CartDetails: {
    removeIcon: RiDeleteBin2Line
  },
  productDetail: {
    prevIcon: RiArrowLeftLine,
    nextIcon: RiArrowRightLine,
    notifyIcon: RiNotification2Fill,
    openOrderIconDate: RiCalendarLine,
    openOrderIconTime: RiTimeLine,
    estimateIconClose: RiCloseFill,
    accordionIcon: GoPlus,
    starRatingIcon: starIcon
  },
  socialShare: {
    FacebookIcon: RiFacebookFill,
    TwitterIcon: RiTwitterFill,
    LinkedinIcon: RiLinkedinBoxFill,
    WhatsappIcon: RiWhatsappFill,
    EmailIcon: RiMailFill,
    TelegramIcon: RiTelegramFill,
  },
  setNewPassword: {
    passwordViewIcon: RiEyeCloseLine,
    passwordHideIcon: RiEyeLine,
    passwordCriteriaIcon: RiCheckboxCircleFill
  },
  register: {
    passwordViewIcon: RiEyeCloseLine,
    passwordHideIcon: RiEyeLine,
    passwordFulfilledCriteriaIcon: RiCheckboxCircleFill,
    passwordUnfulfilledCriteriaIcon: RiCheckboxCircleFill,
    datePickerCalendarIcon: RiCalendarLine,
  },
  thankYou: {
    copy: RiFileCopyLine
  }
}

export default Icon