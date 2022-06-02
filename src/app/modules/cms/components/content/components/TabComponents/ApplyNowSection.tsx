import {FormikErrors} from 'formik'
import {ChangeEvent, useEffect} from 'react'
import * as Yup from 'yup'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: any
  applyNowSectionOptions: FormOptionModal[]
  validationState: {[key: string]: Yup.StringSchema}
  setValidationState: any
  setFieldValue: any
}

export function ApplyNowSection({
  handleChange,
  errors,
  touched,
  values,
  applyNowSectionOptions,
  validationState,
  setValidationState,
  setFieldValue,
}: Props) {
  const showApplySectionId = applyNowSectionOptions?.find(
    (item: FormOptionModal) => item.value === values.applySectionId
  )

  useEffect(() => {
    showApplySectionId?.systemName === 'yes'
      ? setValidationState({
          ...validationState,
          applySection: Yup.object().shape({
            text: Yup.string().required('Text is required'),
            first_button_text: Yup.string().required('First button text is required'),
            first_button_link: Yup.string().required('First button link is required'),
          }),
        })
      : showApplySectionId?.systemName === 'no'
      ? setValidationState({
          ...validationState,
          applySection: Yup.object().shape({
            text: Yup.string().nullable(),
            first_button_text: Yup.string().nullable(),
            first_button_link: Yup.string().nullable(),
          }),
        })
      : null
  }, [values.applySectionId])

  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Show Apply Now Section'
              name='applySectionId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={applyNowSectionOptions}
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          {showApplySectionId?.systemName === 'yes' ? (
            <>
              <div className='row'>
                <div className='col-md-6 col-xs-12'>
                  <FormTextBox
                    type='text'
                    placeholder='Enter Text (EN)'
                    name={`applySection.text`}
                    label='Text (EN)'
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                    required={showApplySectionId?.systemName === 'yes' ? true : false}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormTextBox
                    type='text'
                    placeholder='Enter Text (NP)'
                    name={`applySection.text_np`}
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
                    placeholder='Enter First Button Text (EN)'
                    name={`applySection.first_button_text`}
                    label='First Button Text (EN)'
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                    required={showApplySectionId?.systemName === 'yes' ? true : false}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormTextBox
                    type='text'
                    placeholder='Enter First Button Text (NP)'
                    name={`applySection.first_button_text_np`}
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
                    name={`applySection.first_button_link`}
                    label='First Button Link'
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    onChange={handleChange}
                    errors={errors}
                    touched={touched}
                    required={showApplySectionId?.systemName === 'yes' ? true : false}
                  />
                </div>
                <div className='col-md-6 col-xs-12'>
                  <FormTextBox
                    type='text'
                    placeholder='Enter Second Button Text (EN)'
                    name={`applySection.second_button_text`}
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
                    name={`applySection.second_button_text_np`}
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
                    name={`applySection.second_button_link`}
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
