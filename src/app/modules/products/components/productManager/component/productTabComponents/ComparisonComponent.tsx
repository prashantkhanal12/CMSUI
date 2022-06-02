import {ErrorMessage, FieldArray, FormikErrors} from 'formik'
import _, {capitalize, groupBy, isEmpty, mapValues, omit} from 'lodash'
import {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FormOptionModal} from 'src/app/modules/common/Model'
import * as productCompSubCategoryRedux from '../../../productComparisonSubCategory'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import {ProductOptionModel} from '../../Model'
import FormHiddenTextBox from 'src/cms/helpers/components/forms/FormHiddenTextBox'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: {[key: string]: string} | any
  setFieldValue: any
  editSelectedData: {[key: string]: string} | any
  productComparisonStatusOptions: FormOptionModal[]
}

export function ComparisonParamComponent({
  handleChange,
  errors,
  touched,
  values,
  setFieldValue,
  editSelectedData,
  productComparisonStatusOptions,
}: Props) {
  const dispatch = useDispatch()
  const {
    data: {productComparisonSubCategory},
  } = useSelector((state: any) => state.productComparisonSubCategory)
  useEffect(() => {
    dispatch(productCompSubCategoryRedux.actions.getAllProductComparisonSubCategory())
  }, [])

  const groupedData = _.groupBy(
    productComparisonSubCategory,
    (item: any) => item?.productComparisionCategory?.name
  )

  const showComparisonStatusId = productComparisonStatusOptions?.find(
    (item: FormOptionModal) => item.value === values.productComparisonId
  )

  let counter = -1

  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please select'
              label='Include in Comparison'
              name='productComparisonId'
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={productComparisonStatusOptions}
              required
              values={values}
              setFieldValue={setFieldValue}
            />
          </div>

          {showComparisonStatusId?.systemName === 'yes' && !isEmpty(groupedData) ? (
            <>
              <FieldArray
                name='comparisonData'
                render={(arrayHelpers) => (
                  <div>
                    {Object.keys(groupedData).map((items: any, key: number) => {
                      return (
                        <div className=''>
                          <h2 className='heading__component__title fw-bolder mb-5'>
                            {capitalize(items)}
                          </h2>
                          <div className='row'>
                            {groupedData[items]?.map((item: any, j: number) => {
                              counter = counter + 1
                              return (
                                <div className='col-lg-6'>
                                  <FormHiddenTextBox
                                    labelClassName='col-lg-12'
                                    containerClassName='col-lg-12'
                                    type='hidden'
                                    name={`comparisonData[${counter}].comparisonProductId`}
                                    onChange={handleChange}
                                    setFieldValue={setFieldValue}
                                    readOnly={item.id}
                                    value={item.id}
                                    errors={errors}
                                    touched={touched}
                                    disabled={true}
                                    key={j}
                                  />

                                  <FormTextBox
                                    labelClassName='col-lg-12'
                                    containerClassName='col-lg-12'
                                    type='text'
                                    placeholder={item.name}
                                    label={capitalize(item?.name)}
                                    name={`comparisonData[${counter}].text`}
                                    onChange={handleChange}
                                    errors={errors}
                                    touched={touched}
                                    key={j}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
