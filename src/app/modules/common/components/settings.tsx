import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// includes
import * as setting from 'src/app/modules/siteSettings/components/settings'
import {ISettingTypeState} from 'src/app/modules/siteSettings/components/settings'
import {capitalize, cloneDeep, groupBy, isBoolean, isEmpty, mapValues, omit} from 'lodash'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {FieldArray, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import FormCheckbox from 'src/cms/helpers/components/forms/FormCheckbox'
import FormColorPicker from 'src/cms/helpers/components/forms/FormColorPicker'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import {imageBaseUrl} from 'src/cms/helpers/constants'

interface Props {
  settingTypeId: string
  settingName: string
  settingTypeName: string
}

const DynamicSettings = ({settingTypeId, settingName, settingTypeName}: Props) => {
  const dispatch = useDispatch()
  const settingTypeData: ISettingTypeState = useSelector((state: any) => state.settingType)
  const [settingData, setData] = useState<any>()

  useEffect(() => {
    if (!isEmpty(settingTypeId)) {
      dispatch(setting?.actions.getSpecifiSettingType(settingTypeId, settingTypeName))
    }
  }, [settingTypeId])

  useEffect(() => {
    if (settingTypeData?.updateSuccess) {
      toast.success(`${settingName} updated successfully`)
    }
  }, [settingTypeData])

  useEffect(() => {
    if (
      !isEmpty(settingTypeData?.data?.setting) ||
      !isEmpty(settingTypeData?.data?.contactSetting) ||
      !isEmpty(settingTypeData?.data?.siteSetting)
    ) {
      let currentData: any = []
      if (settingTypeName === 'Backend') {
        currentData = cloneDeep(settingTypeData?.data?.setting)
      } else if (settingTypeName === 'Contact') {
        currentData = cloneDeep(settingTypeData?.data?.contactSetting)
      } else if (settingTypeName === 'Site') {
        currentData = cloneDeep(settingTypeData?.data?.siteSetting)
      }

      const newBackendData = currentData?.map((obj: any) => ({
        ...obj,
        value: obj.value === '1' ? (obj.value === '1' ? true : false) : obj.value,
      }))
      const newSettingData = mapValues(groupBy(newBackendData, 'group.name'), (obj) =>
        obj.map((item) => omit(item, 'group.name'))
      )

      setData(newSettingData)
    }
  }, [settingTypeData])

  return (
    <>
      <div className='heading__component__title fw-bolder mb-4'>{settingName}</div>

      {!isEmpty(settingData) && (
        <Formik
          initialValues={{
            data: [],
          }}
          onSubmit={(values: any, {setSubmitting}) => {
            let newArray: any = []
            Object.keys(values?.data[0]).map((key: any, index) => {
              values?.data[0][key].map((item: any) => {
                let newItem: any = {...item, settingGroupId: item?.group?.id}
                let arr = ['group', 'name', 'settingType', 'label', 'settingGroupId', 'type']
                arr.map((key2: any) => delete newItem[key2])
                newArray.push(newItem)
              })
            })
            const formArray: any = newArray.map((obj: any) => ({
              ...obj,
              value: isBoolean(obj.value) ? (obj.value === true ? '1' : '0') : obj.value,
            }))
            const formData: any = {data: formArray}
            dispatch(setting.actions.updateSettingField(formData, settingTypeId))
          }}
        >
          {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
            useEffect(() => {
              if (!isEmpty(settingData)) {
                const fields = ['data']
                fields.forEach((field) => setFieldValue(field, [settingData], false))
              }
            }, [])

            return (
              <Form className='bg-white'>
                <div className='card-body border-top pt-5 '>
                  <FieldArray
                    name='friends'
                    render={(arrayHelpers) => (
                      <div>
                        {values.data.map((item1: any, index: number) => {
                          return (
                            <div key={index}>
                              {Object.keys(item1).map((key: any, index) => (
                                <div className='border-bottom mb-4 pb-4' key={index}>
                                  <h2 className='heading__component__title fw-bolder mb-5'>
                                    {capitalize(key)}
                                  </h2>

                                  <div className='row'>
                                    {settingData[key]?.map((item: any, j: number) => {
                                      if (item?.type === 'input') {
                                        return (
                                          <div className='col-lg-4' key={j}>
                                            <FormTextBox
                                              labelClassName='col-lg-12'
                                              containerClassName='col-lg-12  '
                                              type='text'
                                              placeholder={item?.label}
                                              label={capitalize(item?.label)}
                                              name={`data[0][${key}][${j}].value`}
                                              onChange={handleChange}
                                              errors={errors}
                                              touched={touched}
                                              required={true}
                                              key={j}
                                            />
                                          </div>
                                        )
                                      } else if (item?.type === 'checkbox') {
                                        return (
                                          <div className='col-lg-4'>
                                            <FormCheckbox
                                              labelClassName='col-md-12'
                                              containerClassName='col-md-12'
                                              label={capitalize(item?.label)}
                                              name={`data[0][${key}][${j}].value`}
                                              touched={touched}
                                              errors={errors as any}
                                              onChange={handleChange}
                                              checkBoxText={item?.label}
                                            />
                                          </div>
                                        )
                                      } else if (item?.type === 'colorpicker') {
                                        return (
                                          <div className='col-lg-4'>
                                            <FormColorPicker
                                              name={`data[0][${key}][${j}].value`}
                                              label={capitalize(item?.label)}
                                              labelClassName='col-lg-12'
                                              containerClassName='col-lg-12'
                                              value={
                                                !isEmpty(values) &&
                                                !isEmpty(values?.data[0][key][j]?.value)
                                                  ? values.data[0][key][j].value
                                                  : item?.value
                                              }
                                              onChange={handleChange}
                                              errors={errors}
                                              touched={touched}
                                              setFieldValue={setFieldValue}
                                            />
                                          </div>
                                        )
                                      } else if (item?.type === 'mediamanager') {
                                        return (
                                          <div className='col-lg-4'>
                                            <FormInputMediaManager
                                              labelClassName='col-md-12'
                                              containerClassName='col-md-12'
                                              label={capitalize(item?.label)}
                                              name={`data[0][${key}][${j}].value`}
                                              setFieldValue={setFieldValue}
                                              // value={item?.value}
                                              value={
                                                !isEmpty(values) &&
                                                !isEmpty(values?.data[0][key][j]?.value)
                                                  ? values?.data[0][key][j].value
                                                  : item?.value
                                              }
                                            />
                                            {!isEmpty(item?.value) ? (
                                              <>
                                                <li className='listing'>
                                                  <div className='thumbImageBlock'>
                                                    {!isEmpty(values) &&
                                                    values?.data[0][key][j].value ===
                                                      item?.value ? null : (
                                                      <button
                                                        type='button'
                                                        title='Remove'
                                                        className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                                        onClick={() => {
                                                          setFieldValue(
                                                            `data[0][${key}][${j}].value`,
                                                            item?.value
                                                          )
                                                        }}
                                                      >
                                                        Delete
                                                      </button>
                                                    )}
                                                    <img
                                                      className='thumbImage w-100 h-100'
                                                      src={
                                                        !isEmpty(values) &&
                                                        !isEmpty(values?.data[0][key][j]?.value)
                                                          ? `${imageBaseUrl}/${values.data[0][key][j].value}`
                                                          : `${imageBaseUrl}/${item?.value}`
                                                      }
                                                      alt=''
                                                    />
                                                  </div>
                                                </li>
                                              </>
                                            ) : null}
                                          </div>
                                        )
                                      } else if (item?.type === 'numberfield') {
                                        return (
                                          <div className='col-lg-4'>
                                            <FormTextBox
                                              name={`data[0][${key}][${j}].value`}
                                              label={capitalize(item?.label)}
                                              labelClassName='col-lg-12'
                                              containerClassName='col-lg-12'
                                              onChange={handleChange}
                                              errors={errors}
                                              touched={touched}
                                              type='number'
                                              min='0'
                                            />
                                          </div>
                                        )
                                      }
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  />
                </div>

                <div className='d-flex justify-content-end px-5 pb-9'>
                  <button type='submit' disabled={false} className='btn btn-primary btn-sm '>
                    Save
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      )}
    </>
  )
}

export default DynamicSettings
