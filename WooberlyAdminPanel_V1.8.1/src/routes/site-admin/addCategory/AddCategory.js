import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddCategoryForm from '../../../components/SiteAdmin/AddCategoryForm'

export class AddCategory extends Component {

    render() {
        return (
            <div>
                <AddCategoryForm />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
