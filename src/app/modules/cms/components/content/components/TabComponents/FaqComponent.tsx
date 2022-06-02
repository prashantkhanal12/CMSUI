import {FormikErrors} from 'formik'
import * as Yup from 'yup'
import {ChangeEvent, useEffect} from 'react'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  faqOptionOptions: FormOptionModal[]
  faqCategoryOptions: FormOptionModal[]
  validationState: {[key: string]: Yup.StringSchema}
  setValidationState: any
  values: any
  setFieldValue: any
}

export function FaqComponent({
  handleChange,
  errors,
  touched,
  values,
  faqCategoryOptions,
  faqOptionOptions,
  validationState,
  setValidationState,
  setFieldValue,
}: Props) {
  const showFaqId = faqOptionOptions?.find(
    (item: FormOptionModal) => item.value === values.faqOptionId
  )
  useEffect(() => {
    showFaqId?.systemName === 'yes'
      ? setValidationState({
          ...validationState,
          faqId: Yup.string().required('Faq category  is required'),
        })
      : showFaqId?.systemName === 'no'
      ? setValidationState({
          ...validationState,
          faqId: Yup.string().nullable(),
        })
      : null
  }, [values.faqOptionId])

  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Show Faqs'
              name='faqOptionId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={faqOptionOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
          {showFaqId?.systemName === 'yes' ? (
            <>
              <div className='col-md-6 col-xs-12'>
                <FormSelect
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  placeholder='Please select'
                  label='Faq Category'
                  name='faqId'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  options={faqCategoryOptions}
                  required={showFaqId?.systemName === 'yes' ? true : false}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
