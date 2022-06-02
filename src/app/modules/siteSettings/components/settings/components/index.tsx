import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {Form, Formik, useFormikContext} from 'formik'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {SettingFieldModel, SettingTypeModel} from '../Model'
import {KeyModel} from '../groupSetting/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import * as settings from '../index'
import * as groupSettings from '../groupSetting/index'
import GroupSetting from '../groupSetting/components'

import {Tab, Tabs} from 'react-bootstrap-v5'
import FormColorPicker from 'src/cms/helpers/components/forms/FormColorPicker'
import FormCheckbox from 'src/cms/helpers/components/forms/FormCheckbox'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import {isEmpty} from 'lodash'
import {imageBaseUrl} from 'src/cms/helpers/constants'
import {toast} from 'react-toastify'

const Settings = () => {
  const dispatch = useDispatch()
  const {loading, success, data} = useSelector((state: any) => state.settingType)

  const {
    loading: groupLoading,
    success: groupSuccess,
    data: groupdata,
    settingGroup,
  } = useSelector((state: any) => state.groupSetting)

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    value: Yup.string().required('Value is required'),
    id: Yup.string().required('Setting Type is required'),
    label: Yup.string().required('Label is required'),
    type: Yup.string().required('Form Type is required'),
    settingGroupId: Yup.string().required('Setting Group is required'),
  })

  useEffect(() => {
    dispatch(settings?.actions?.getSettingType())
    dispatch(groupSettings?.actions?.getSettingGroupList())
  }, [])

  const ResetSettingForm = () => {
    const {resetForm, setFieldValue} = useFormikContext()
    useEffect(() => {
      if (success) {
        resetForm()
        setFieldValue('label', '')
        toast.success('Setting added successfully')
        dispatch(settings?.actions?.createSettingFieldReset())
      }
    }, [success])
    return null
  }

  const settingTypesOption = data?.settingType?.map((setting: SettingTypeModel) => ({
    label: setting?.name,
    value: setting?.id,
  }))
  const groupNameOption = settingGroup?.map((setting: KeyModel) => ({
    label: setting?.name,
    value: setting?.id,
  }))

  const formTypeOption = [
    {label: 'Input field', value: 'input'},
    {label: 'Colorpicker field', value: 'colorpicker'},
    {label: 'Checkbox field', value: 'checkbox'},
    {label: 'Media Manager field', value: 'mediamanager'},
    {label: 'Number Field', value: 'numberfield'},
  ]

  return (
    <div className='modal-container shadow rounded'>
      <div className='bg-white p-5'>
        <Tabs defaultActiveKey='settings' id='uncontrolled-tab-example' className='mb-5'>
          <Tab eventKey='settings' title='Settings'>
            <div className='card-body bg-white'>
              <Formik
                initialValues={{
                  name: '',
                  value: '',
                  settingGroupId: '',
                  id: '',
                  type: '',
                  label: '',
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(values: SettingFieldModel, {setSubmitting}) => {
                  const formData: any = {
                    data: [
                      {
                        name: values?.name,
                        value:
                          values?.type === 'checkbox' ? (values?.value ? '1' : '0') : values?.value,
                        label: values?.label,
                        settingGroupId: values?.settingGroupId,
                        type: values?.type,
                      },
                    ],
                  }
                  dispatch(settings.actions.createSettingField(formData, values.id))
                }}
              >
                {({touched, handleChange, errors, values, setFieldValue}: any) => {
                  return (
                    <Form>
                      <div className=' border-top pt-5'>
                        <h3 className='mb-5'>Create settings</h3>
                        <div className='row'>
                          <div className='col-lg-6'>
                            <FormSelect
                              containerClassName='col-lg-12'
                              placeholder='Select a setting'
                              label='Setting Type'
                              name='id'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              required={true}
                              options={settingTypesOption}
                              values={values}
                              setFieldValue={setFieldValue}
                            />
                          </div>
                          <div className='col-lg-6'>
                            <FormTextBox
                              containerClassName='col-lg-12'
                              type='text'
                              placeholder='Name '
                              label='Name'
                              name='name'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              required={true}
                            />
                          </div>
                          <div className='col-lg-6'>
                            <FormTextBox
                              containerClassName='col-lg-12'
                              type='text'
                              placeholder='Label'
                              label='Label'
                              name='label'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              required={true}
                            />
                          </div>
                          <div className='col-lg-6'>
                            <FormSelect
                              containerClassName='col-lg-12'
                              placeholder='Select form type'
                              label='Form Type'
                              name='type'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              required={true}
                              options={formTypeOption}
                              values={values}
                              setFieldValue={setFieldValue}
                            />
                          </div>
                          {values.type === 'input' ? (
                            <>
                              <div className='col-lg-6'>
                                <FormTextBox
                                  labelClassName='col-md-12'
                                  containerClassName='col-md-12'
                                  placeholder='Enter Input Value'
                                  label='Value'
                                  name='value'
                                  onChange={handleChange}
                                  errors={errors}
                                  touched={touched}
                                  required={true}
                                />
                              </div>
                            </>
                          ) : values.type === 'colorpicker' ? (
                            <>
                              <div className='col-lg-6'>
                                <FormColorPicker
                                  name='value'
                                  label='Color code'
                                  labelClassName='col-lg-12'
                                  containerClassName='col-lg-12'
                                  value={values?.value}
                                  onChange={handleChange}
                                  errors={errors}
                                  touched={touched}
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </>
                          ) : values.type === 'checkbox' ? (
                            <>
                              <div className='col-lg-6'>
                                <FormCheckbox
                                  label='Checkbox'
                                  labelClassName='col-md-12'
                                  containerClassName='col-md-12'
                                  name='value'
                                  touched={touched}
                                  errors={errors}
                                  onChange={handleChange}
                                  checkBoxText={values.label}
                                />
                              </div>
                            </>
                          ) : values.type === 'mediamanager' ? (
                            <>
                              <div className='col-lg-6'>
                                <FormInputMediaManager
                                  labelClassName='col-md-12'
                                  containerClassName='col-md-12'
                                  label='Attached File'
                                  name='value'
                                  setFieldValue={setFieldValue}
                                  value={values?.value}
                                />
                                {!isEmpty(values?.value) ? (
                                  <>
                                    <li className='listing'>
                                      <div className='thumbImageBlock'>
                                        <button
                                          type='button'
                                          title='Remove'
                                          className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                          onClick={() => {
                                            setFieldValue('value', '')
                                          }}
                                        >
                                          Delete
                                        </button>

                                        <img
                                          className='thumbImage w-100 h-100'
                                          src={`${imageBaseUrl}/${values?.value}`}
                                          alt=''
                                        />
                                      </div>
                                    </li>
                                  </>
                                ) : null}
                              </div>
                            </>
                          ) : values.type === 'numberfield' ? (
                            <>
                              <div className='col-lg-6'>
                                <FormTextBox
                                  labelClassName='col-md-12'
                                  containerClassName='col-md-12'
                                  type='number'
                                  placeholder='Enter Input Value'
                                  label='Value'
                                  name='value'
                                  min='0'
                                  onChange={handleChange}
                                  errors={errors}
                                  touched={touched}
                                  required={true}
                                />
                              </div>
                            </>
                          ) : null}
                          <div className='col-lg-6'>
                            <FormSelect
                              containerClassName='col-lg-12'
                              placeholder='Select a group name'
                              label='Group Name'
                              name='settingGroupId'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              required={true}
                              options={groupNameOption}
                              values={values}
                              setFieldValue={setFieldValue}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='d-flex justify-content-end '>
                        <button
                          type='submit'
                          disabled={groupLoading || loading}
                          className='btn btn-primary btn-sm'
                        >
                          Save
                        </button>
                      </div>
                      <ResetSettingForm />
                    </Form>
                  )
                }}
              </Formik>
            </div>
          </Tab>
          <Tab eventKey='groupSettings' title='Group Settings'>
            <div className='card-body bg-white'>
              <GroupSetting />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
export default Settings
