/* Library Package */
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import {
  useI18n,
  Copyright,
  Widget,
  NewsletterForm
} from "@sirclo/nexus";

import { FaArrowRight } from 'react-icons/fa'

/* Library Template */
import useWindowSize from 'lib/useWindowSize'

/* Component */
import FooterWidget from './FooterWidget'

/* Styles */
import styles from 'public/scss/components/Footer.module.scss'

const classesNewsletter = {
  containerClassName: styles.footerNewsletter,
  labelClassName: styles.footerNewsletter_label,
  inputClassName: styles.footerNewsletter_input,
  buttonClassName: styles.footerNewsletter_button
}

const Footer: FC<any> = () => {

  const i18n: any = useI18n()
  const size: any = useWindowSize()
  const [widgetFoot1, setWidgetFoot1] = useState<number | null>(null)
  const [widgetFoot2, setWidgetFoot2] = useState<number | null>(null)
  const [widgetFoot3, setWidgetFoot3] = useState<number | null>(null)

  return (
    <footer className={`${styles.footer}`}>

      <div className="container-fluid">
        <div className={`${styles.footer_top} row`}>
          {(widgetFoot1 > 0 || widgetFoot1 === null) &&
            <div className="col-12 col-md-3">
              <div className={styles.footerItem}>
                <FooterWidget collapsible={false}>
                  <Widget
                    pos="footer-1"
                    getItemCount={(total: number) => setWidgetFoot1(total)}
                    widgetClassName={`${styles.footerItem_content}`}
                    loadingComponent={
                      <p className={styles.footer_loading}>
                        {i18n.t("global.loading")}
                      </p>
                    }
                    thumborSetting={{
                      width: size.width < 992 ? 270 : 480,
                      format: "webp",
                      quality: 85
                    }}
                  />
                </FooterWidget>
              </div>
            </div>
          }
          {(widgetFoot2 > 0 || widgetFoot2 === null) &&
            <div className="col-12 col-md-3">
              <div className={styles.footerItem}>
                <FooterWidget>
                  <Widget
                    pos="footer-2"
                    getItemCount={(total: number) => setWidgetFoot2(total)}
                    widgetClassName={styles.footerItem_content}
                    loadingComponent={
                      <p className={styles.footer_loading}>
                        {i18n.t("global.loading")}
                      </p>
                    }
                    thumborSetting={{
                      width: size.width < 992 ? 270 : 480,
                      format: "webp",
                      quality: 85
                    }}
                  />
                </FooterWidget>
              </div>
            </div>
          }
          {(widgetFoot3 > 0 || widgetFoot3 === null) &&
            <div className="col-12 col-md-3">
              <div className={styles.footerItem}>
                <FooterWidget>
                  <Widget
                    pos="footer-3"
                    getItemCount={(total: number) => setWidgetFoot3(total)}
                    widgetClassName={styles.footerItem_content}
                    loadingComponent={
                      <p className={styles.footer_loading}>
                        {i18n.t("global.loading")}
                      </p>
                    }
                    thumborSetting={{
                      width: size.width < 992 ? 270 : 480,
                      format: "webp",
                      quality: 85
                    }}
                  />
                </FooterWidget>
              </div>
            </div>
          }
          <div className="col-12 col-md-3">
            <div className={styles.footerItem}>
              <h3 className={styles.footer_newsletterTitle}>{i18n.t("newsletter.title")}</h3>
              <NewsletterForm
                classes={classesNewsletter}
                onComplete={() => toast.success(i18n.t("newsletter.submitSuccess"))}
                onError={() => toast.error(i18n.t("newsletter.submitError"))}
                buttonComponent={
                  <FaArrowRight />
                }
              />
            </div>
          </div>
        </div>
        <div className={`${styles.footer_bottom} row`}>
          <div className="col-12">
            <div className={styles.footer_copyright}>
              <Copyright>
                <Widget 
                  pos="copyright-and-policy" 
                  thumborSetting={{
                    width: 1,
                    format: 'webp',
                    quality: 5,
                  }}
                />
              </Copyright>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer