import "./index.scss"
import { DonationForm } from './DonationForm'
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import { Panel, PanelBody, CheckboxControl, TextControl } from '@wordpress/components'

wp.blocks.registerBlockType("makeupnamespace/make-up-block-name", {
  title: "givewp-react-form",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    title: { type: "string" },
    logo: { type: "string" },
    anonymous: { type: "boolean" }
  },
  edit: EditComponent,
  save: function () {
    return
  }
})

function EditComponent(props) {
  let settings = {
    anonymous: false,
    title: '',
    logo: ''
  }
  const form = (props) => {
  return <div className="givewp-form"><DonationForm props={props}/></div>
  }

  function updateAnonymous(e) {
    props.setAttributes({ anonymous: e.target.checked })
    settings.anonymous = e.target.checked
  }

  function updateTitle(e) {
    props.setAttributes({ title: e.target.value })
    settings.title = e.target.value
  }

  function updateLogo(e) {
    props.setAttributes({ logo: e.target.value })
    console.log("logo update")
    settings.logo = e.target.value
  }

  return (
    <div { ...useBlockProps() }>
      <InspectorControls>
        <Panel>
          <PanelBody title="Donation Form">
            <CheckboxControl
            label="Anonymous"
            help="An option to donate anonymously"
            onChange={(e) => updateAnonymous(e)}/>
          </PanelBody>
          <PanelBody>
            <label htmlFor="Logo">Paste the link to your Logo here:</label>
            <input onChange={e => updateLogo(e)} id="Logo" 
            placeholder="https://cdn.pixabay.com/photo/2017/09/18/16/54/links-2762389_960_720.png"/>
            <label htmlFor="title">Form Title:</label>
            <input onChange={e => updateLogo(e)} id="title" 
            placeholder="Donate Today!"/>
          </PanelBody>
        </Panel>
      </InspectorControls>
    {form(settings)}
       
    </div>
  )
}
