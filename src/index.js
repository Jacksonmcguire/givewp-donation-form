import "./index.scss"
import { DonationForm } from './DonationForm'

wp.blocks.registerBlockType("makeupnamespace/make-up-block-name", {
  title: "givewp-react-form",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    skyColor: { type: "string" },
    grassColor: { type: "string" }
  },
  edit: EditComponent,
  save: function () {
    return null
  }
})

function EditComponent(props) {
  function updateSkyColor(e) {
    props.setAttributes({ skyColor: e.target.value })
  }

  function updateGrassColor(e) {
    props.setAttributes({ grassColor: e.target.value })
  }

  return (
    <div className="givewp-form">
      <DonationForm/>
    </div>
  )
}
