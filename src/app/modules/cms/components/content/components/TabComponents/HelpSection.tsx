import {FormikErrors} from 'formik'
import {isEmpty} from 'lodash'
import * as Yup from 'yup'
import {ChangeEvent, useEffect} from 'react'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {imageBaseUrl} from 'src/cms/helpers/constants'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: any
  setFieldValue: any
  helpSectionOptions: FormOptionModal[]
  validationState: {[key: string]: Yup.StringSchema}
  setValidationState: any
}

export function HelpSection({
  handleChange,
  errors,
  touched,
  values,
  setFieldValue,
  helpSectionOptions,
  validationState,
  setValidationState,
}: Props) {
  const showHelpSectionId = helpSectionOptions?.find(
    (item: FormOptionModal) => item.value === values.helpSectionId
  )
  useEffect(() => {
    showHelpSectionId?.systemName === 'yes'
      ? setValidationState({
          ...validationState,
          helpSection: Yup.object().shape({
            text: Yup.string().required('Text is required'),
            sub_text: Yup.string().required('Subtext is required'),
            image: Yup.string().required('Image is required'),
            first_button_text: Yup.string().required('First button text is required'),
            first_button_link: Yup.string().required('First button link is required'),
          }),
        })
      : showHelpSectionId?.systemName === 'no'
      ? setValidationState({
          ...validationState,
          helpSection: Yup.object().shape({
            text: Yup.string().nullable(),
            sub_text: Yup.string().nullable(),
            image: Yup.string().nullable(),
            first_button_text: Yup.string().nullable(),
            first_button_link: Yup.string().nullable(),
          }),
        })
      : null
  }, [values.helpSectionId])
  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Show Help Section'
              name='helpSectionId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={helpSectionOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          {showHelpSectionId?.systemName === 'yes' ? (
            <>
              <div className='row'>
                <div className='col-md-6 col-xs-12'>
                  <FormTextBox
                    type='text'
                    placeholder='Enter Text (EN)'
                    name={`helpSection.text`}
                    label='Text (EN)'
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                    required={showHelpSectionId?.systemName === 'yes' ? true : false}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormTextBox
                    type='text'
                    placeholder='Enter Text (NP)'
                    name={`helpSection.text_np`}
                    label='Text (NP)'
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
                    placeholder='Enter Sub Text (EN)'
                    name={`helpSection.sub_text`}
                    label='Text (EN)'
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                    required={showHelpSectionId?.systemName === 'yes' ? true : false}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormTextBox
                    type='text'
                    placeholder='Enter Sub Text (NP)'
                    name={`helpSection.sub_text_np`}
                    label='Text (NP)'
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormInputMediaManager
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    label='Image (EN)'
                    name={`helpSection.image`}
                    setFieldValue={setFieldValue}
                    value={values?.helpSection?.image}
                  />

                  {!isEmpty(values?.helpSection?.image) ? (
                    <>
                      <li className='listing'>
                        <div className='thumbImageBlock'>
                          <button
                            type='button'
                            title='Remove'
                            className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                            onClick={() => {
                              setFieldValue(`helpSection.image`, '')
                            }}
                          >
                            Delete
                          </button>

                          <img
                            className='thumbImage w-100 h-100'
                            src={`${imageBaseUrl}/${values?.helpSection?.image}`}
                            alt=''
                          />
                        </div>
                      </li>
                    </>
                  ) : null}
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormInputMediaManager
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    label='Image (NP)'
                    name={`helpSection.image_np`}
                    setFieldValue={setFieldValue}
                    value={values?.helpSection?.image_np}
                  />

                  {!isEmpty(values?.helpSection?.image_np) ? (
                    <>
                      <li className='listing'>
                        <div className='thumbImageBlock'>
                          <button
                            type='button'
                            title='Remove'
                            className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                            onClick={() => {
                              setFieldValue(`helpSection.image_np`, '')
                            }}
                          >
                            Delete
                          </button>

                          <img
                            className='thumbImage w-100 h-100'
                            src={`${imageBaseUrl}/${values?.helpSection?.image_np}`}
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
                    placeholder='Enter First Button Text (EN)'
                    name={`helpSection.first_button_text`}
                    label='First Button Text (EN)'
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                    required={showHelpSectionId?.systemName === 'yes' ? true : false}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormTextBox
                    type='text'
                    placeholder='Enter First Button Text (NP)'
                    name={`helpSection.first_button_text_np`}
                    label='First Button Text (NP)'
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
                    placeholder='Enter First Button Link'
                    name={`helpSection.first_button_link`}
                    label='First Button Link'
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                    required={showHelpSectionId?.systemName === 'yes' ? true : false}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormTextBox
                    type='text'
                    placeholder='Enter Second Button Text (EN)'
                    name={`helpSection.second_button_text`}
                    label='Second Button Text (EN)'
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
                    placeholder='Enter Second Button Text (NP)'
                    name={`helpSection.second_button_text_np`}
                    label='Second Button Text (NP)'
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
                    placeholder='Enter Second Button Link'
                    name={`helpSection.second_button_link`}
                    label='Second Button Link'
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
