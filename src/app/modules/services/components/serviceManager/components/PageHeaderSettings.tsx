import {isEmpty} from 'lodash'
import {ChangeEvent} from 'react'
import {FormikErrors} from 'formik'

// includes
import {imageBaseUrl} from 'src/cms/helpers/constants'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: any}>
  touched: any
  setFieldValue: any
  values: any
}

const PageHeaderSettings = ({handleChange, errors, touched, setFieldValue, values}: Props) => {
  return (
    <div className='row'>
      <div className='col-12'>
        <FormInputMediaManager
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          label='Header Image (1920 * 480)px'
          name='pageHeader[0].headerImage'
          setFieldValue={setFieldValue}
          value={values?.pageHeader[0]?.headerImage}
        />

        {!isEmpty(values?.pageHeader[0]?.headerImage) ? (
          <>
            <li className='listing'>
              <div className='thumbImageBlock'>
                <button
                  type='button'
                  title='Remove'
                  className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                  onClick={() => {
                    setFieldValue('image', '')
                  }}
                >
                  X
                </button>

                <img
                  className='thumbImage w-100 h-100'
                  src={`${imageBaseUrl}/${values?.pageHeader[0]?.headerImage}`}
                  alt=''
                />
              </div>
            </li>
          </>
        ) : null}
      </div>
      <div className='col-md-6 col-sm-6 col-xs-12'>
        <FormTextBox
          type='text'
          placeholder='Enter Tagline'
          name='pageHeader[0].tagLine'
          label='Tagline (EN)'
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
          placeholder='Enter Tagline (NP)'
          name='pageHeader[0].tagLineNp'
          label='Tagline (NP)'
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
          placeholder='Enter First CTA Button Text (EN)'
          name='pageHeader[0].firstCtaButton'
          label='First CTA Button Text (EN)'
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
          placeholder='Enter First CTA Button Text (NP)'
          name='pageHeader[0].firstCtaButtonNp'
          label='First CTA Button Text (NP)'
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
          placeholder='Enter First CTA Button Link'
          name='pageHeader[0].firstCtaButtonLink'
          label='First CTA Button Link'
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
          placeholder='Enter Second CTA Button Text (EN)'
          name='pageHeader[0].secondCtaButton'
          label='Second CTA Button Text (EN)'
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
          placeholder='Enter Second CTA Button Text (NP)'
          name='pageHeader[0].secondCtaButtonNp'
          label='Second CTA Button Text (NP)'
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
          placeholder='Enter Second CTA Button Link'
          name='pageHeader[0].secondCtaButtonLink'
          label='Second CTA Button Link'
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          onChange={handleChange}
          errors={errors}
          touched={touched}
        />
      </div>
    </div>
  )
}

export default PageHeaderSettings
