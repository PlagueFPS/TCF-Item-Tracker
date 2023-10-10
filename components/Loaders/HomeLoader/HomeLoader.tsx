import styles from './HomeLoader.module.css'
import HeaderLoader from '../HeaderLoader/HeaderLoader'

export default function HomeLoader() {
  return (
    <>
      <HeaderLoader />
      <div className={ styles.container }>
        <div className={ styles.button } />
        <div className={ styles.imageContainer }>
          <span className={ styles.imageContainerTitle }></span>
          { [...Array(100).keys()].map(i => (
            <div key={ i } className={ styles.image }></div>
          )) }
        </div>
        <div className={ styles.itemList }>
          <div className={ styles.itemListHeader }>
            <div className={ styles.btnContainer }>
              <span className={ styles.clearBtn }></span>
              <span className={ styles.switchBtn }></span>
            </div>
            <div>
              <h2 className={ styles.itemListTitle }></h2>
              <div className={ styles.formControl }>
                <span className={ styles.input } />
                <span className={ styles.submitButton }></span>
              </div>
            </div>
          </div>
          <div className={ styles.listBtnFilter_Container }>
            <span className={ styles.listBtnFilter }></span>
            <span className={ styles.listBtnFilter }></span>
            <span className={ styles.listBtnFilter }></span>
          </div>
        </div>
      </div>
    </>
  )
}
