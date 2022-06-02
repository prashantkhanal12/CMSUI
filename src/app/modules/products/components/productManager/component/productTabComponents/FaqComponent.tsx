import {FormikErrors} from 'formik'
import {ChangeEvent, useEffect} from 'react'
import * as Yup from 'yup'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import {cloneDeep, isEmpty} from 'lodash'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: {[key: string]: string} | any
  faqOption: FormOptionModal[]
  faqCategoryOptions: FormOptionModal[]
  validationState: any
  setValidationState: any
  setFieldValue: any
}

export function FaqComponent({
  handleChange,
  errors,
  touched,
  values,
  faqOption,
  faqCategoryOptions,
  validationState,
  setValidationState,
  setFieldValue,
}: Props) {
  const faqShowId = faqOption?.find((item: FormOptionModal) => item.value === values.faqOptionId)

  useEffect(() => {
    if (!isEmpty(faqShowId) && faqShowId?.systemName === 'yes' && !isEmpty(values?.faqOptionId)) {
      setValidationState({
        ...validationState,
        faqId: Yup.string().required('Faq Category is required'),
      })
    } else if (!isEmpty(faqShowId) && faqShowId?.systemName === 'no') {
      let newValidationSchema = cloneDeep(validationState)
      !isEmpty(newValidationSchema['faqId']) && delete newValidationSchema['faqId']
      setValidationState(newValidationSchema)
    }
  }, [values?.faqOptionId])

  return (
    <div className='row'>
      <div className='col-md-6 col-xs-12'>
        <FormSelect
          labelClassName='col-md-12'
          containerClassName='col-md-12'
          placeholder='Please select'
          label='Show Faq Section'
          name='faqOptionId'
          onChange={handleChange}
          errors={errors}
          touched={touched}
          options={faqOption}
          required
          values={values}
          setFieldValue={setFieldValue}
        />
      </div>

      {faqShowId?.systemName === 'yes' ? (
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
              required={faqShowId?.systemName === 'yes' ? true : false}
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}
function newValidationSchema(newValidationSchema: any) {
  throw new Error('Function not implemented.')
}
