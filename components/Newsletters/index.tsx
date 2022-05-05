/* library package */
import { FC } from 'react'
import { Newsletter } from '@sirclo/nexus'
import { toast } from 'react-toastify'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import styles from 'public/scss/components/Newsletter.module.scss'

const classesNewsletter = {
  newsLetterWrapperClassName: styles.newsletter_wrapper,
  newsLetterContainerClassName: styles.newsletter_popupInner,
  newsLetterCloseButtonClassName: styles.newsletter_close,
  newsLetterContentContainerClassName: styles.newsletter_contentContainer,
  newsLetterContentClassName: styles.newsletter_content,
  newsLetterImageContainerClassName: styles.newsletter_imageContainer,
  newsLetterImageClassName: styles.newsletter_image,
  newsLetterNoThanksButtonClassName: styles.button,
  newsLetterFormContainerClassName: styles.newsletter_form,
  newsLetterFormLabelClassName: styles.newsletter_label,
  newsLetterFormInputClassName: styles.newsletter_input,
  newsLetterFormButtonClassName: styles.newsletter_button
}

const Newsletters: FC<any> = ({
  i18n
}) => {
  const size: any = useWindowSize()

  return (
    <div className={styles.newsletter_popupContainer}>
      <Newsletter
        classes={classesNewsletter}
        withForm
        noThanksButton={i18n.t("home.later")}
        buttonComponent={i18n.t("newsletter.subscribe")}
        onComplete={() => toast.success(i18n.t("newsletter.submitSuccess"))}
        onError={() => toast.error(i18n.t("newsletter.submitError"))}
        thumborSetting={{
          width: size.width < 768 ? 512 : 800,
          format: 'webp',
          quality: 85,
        }}
      />
    </div>
  )
}

export default Newsletters
