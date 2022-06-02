import {FormikErrors} from 'formik'
import {isEmpty} from 'lodash'
import {ChangeEvent} from 'react'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {imageBaseUrl} from 'src/cms/helpers/constants'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: {[key: string]: string} | any
  editSelectedData: {[key: string]: string}
  setFieldValue: any
}

export function PageHeaderSettingComponent({
  handleChange,
  errors,
  touched,
  values,
  setFieldValue,
  editSelectedData,
}: Props) {
  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormInputMediaManager
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              label='Header Image'
              name={`pageHeader.headerImage`}
              setFieldValue={setFieldValue}
              value={values?.pageHeader?.headerImage}
            />

            {!isEmpty(values?.pageHeader?.headerImage) ? (
              <>
                <li className='listing'>
                  <div className='thumbImageBlock'>
                    <button
                      type='button'
                      title='Remove'
                      className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                      onClick={() => {
                        setFieldValue(`pageHeader.headerImage`, '')
                      }}
                    >
                      Delete
                    </button>

                    <img
                      className='thumbImage w-100 h-100'
                      src={`${imageBaseUrl}/${values?.pageHeader?.headerImage}`}
                      alt=''
                    />
                  </div>
                </li>
              </>
            ) : null}
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Tagline (EN)'
              name={`pageHeader.tagLine`}
              label='Tagline (EN)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Tagline (NP)'
              name={`pageHeader.tagLineNp`}
              label='Tagline (NP)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter First CTA Button Text (EN)'
              name={`pageHeader.firstCtaButton`}
              label='First CTA Button Text (EN)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter First CTA Button Text (NP)'
              name={`pageHeader.firstCtaButtonNp`}
              label='First CTA Button Text (NP)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter First CTA Button Link'
              name={`pageHeader.firstCtaButtonLink`}
              label='First CTA Button Link'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Second CTA Button Text (EN)'
              name={`pageHeader.secondCtaButton`}
              label='Second CTA Button Text (EN)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Second CTA Button Text (NP)'
              name={`pageHeader.secondCtaButtonNp`}
              label='Second CTA Button Text (NP)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormTextBox
              type='text'
              placeholder='Enter Second CTA Button Link (EN)'
              name={`pageHeader.secondCtaButtonLink`}
              label='Second CTA Button Link (EN)'
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              onChange={handleChange}
              errors={errors}
              touched={touched}
            />
          </div>
        </div>
      </div>
    </>
  )
}
