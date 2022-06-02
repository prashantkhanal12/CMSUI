import {FormikErrors} from 'formik'
import {isEmpty} from 'lodash'
import {ChangeEvent} from 'react'
import FormCheckbox from 'src/cms/helpers/components/forms/FormCheckbox'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import {imageBaseUrl} from 'src/cms/helpers/constants'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  editSelectedData: {[key: string]: string}
  values: {[key: string]: string} | any
  setFieldValue?: any
}

export default function PageHeaderComponent({
  handleChange,
  errors,
  touched,
  editSelectedData,
  values,
  setFieldValue,
}: Props) {
  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Meta Title'
              name='metaTitle'
              label='Meta Title'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Meta Keyword'
              name='metaKeyword'
              label='Meta Keyword'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              label='Meta Description '
              name='metaDescription'
              initialValue={!isEmpty(editSelectedData) ? editSelectedData?.metaDescription : ''}
              handleChange={handleChange}
            />
          </div>

          <div className='col-md-6 col-xs-12'>
            <FormInputMediaManager
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              label='Header Image'
              name='headerImage'
              setFieldValue={setFieldValue}
              value={values?.headerImage}
            />

            {!isEmpty(values?.headerImage) ? (
              <>
                <li className='listing'>
                  <div className='thumbImageBlock'>
                    <button
                      type='button'
                      title='Remove'
                      className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                      onClick={() => {
                        setFieldValue('headerImage', '')
                      }}
                    >
                      Delete
                    </button>

                    <img
                      className='thumbImage w-100 h-100'
                      src={`${imageBaseUrl}/${values?.headerImage}`}
                      alt=''
                    />
                  </div>
                </li>
              </>
            ) : null}
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              name='headerShortDescription'
              label='Header Short Description (EN)'
              initialValue={
                !isEmpty(editSelectedData) ? editSelectedData?.headerShortDescription : ''
              }
              handleChange={handleChange}
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTinyMce
              containerClassName='col-md-12'
              name='headerShortDescriptionNp'
              label='Header Short Description (NP)'
              initialValue={
                !isEmpty(editSelectedData) ? editSelectedData?.headerShortDescriptionNp : ''
              }
              handleChange={handleChange}
            />
          </div>

          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter First Button Text (EN)'
              name='firstButtonText'
              label='First Button Text (EN)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter First Button Text (NP)'
              name='firstButtonTextNp'
              label='First Button Text (NP)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter First Button Link'
              name='firstButtonLink'
              label='First Button Link'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Second Button Text (EN)'
              name='secondButtonText'
              label='Second Button Text (EN)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Second Button Text (NP)'
              name='secondButtonTextNp'
              label='Second Button Text (NP)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Second Button Link'
              name='secondButtonLink'
              label='Second Button Link'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-sm-12 col-xs-12'>
            <div className='row pt-5'>
              <FormCheckbox
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                name='showNotificationBell'
                touched={touched}
                errors={errors}
                onChange={handleChange}
                checkBoxText='Show Notification Bell'
              />

              <FormCheckbox
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                name='showToLoggedInUserOnly'
                touched={touched}
                errors={errors}
                onChange={handleChange}
                checkBoxText='Show to logged in user only'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
