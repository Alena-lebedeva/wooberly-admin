import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import { maxUploadSize, api } from '../../../config';
import cx from 'classnames';
import { toastr }  from 'react-redux-toastr';
import { change } from 'redux-form';
import { updateTempImages } from '../../../actions/siteadmin/TempImages/updateTempImages';

export class Dropzone extends Component {

    constructor(props) {
        super(props)

        this.addedfile = this.addedfile.bind(this);
        this.success = this.success.bind(this);
        this.dropzone = null;
    }

    componentDidUpdate() {
        const isBrowser = typeof window !== 'undefined';
        const isDocument = typeof document !== undefined;
        if (isBrowser && isDocument) {
            document.querySelector(".dz-hidden-input").style.visibility = 'visible';
            document.querySelector(".dz-hidden-input").style.opacity = '0';
            document.querySelector(".dz-hidden-input").style.height = '100%';
            document.querySelector(".dz-hidden-input").style.width = '100%';
            document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
        }
        
    }

    async success(file, fromServer) {
        const { change, fieldName, updateTempImages } = this.props;
        const fileName = fromServer.fileName;
        await change("AboutSettingsForm", fieldName, fileName);
        await updateTempImages('Homepage', fieldName, fileName);
    }

    addedfile(file, fromServer) {
        const { startProfilePhotoLoader, stopProfilePhotoLoader } = this.props;
        let fileFormates = [
            'application/sql',
            'application/pdf',
            'application/vnd.oasis.opendocument.presentation',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/epub+zip',
            'application/zip',
            'text/plain',
            'application/rtf',
            'application/vnd.oasis.opendocument.text',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.spreadsheet',
            'text/tab-separated-values',
            'text/calendar'
        ];

        if (file && file.size > (1024 * 1024 * maxUploadSize)) {
            toastr.error('Maximum upload size Exceeded! ', 'Try with smallest size image');
            this.dropzone.removeFile(file);
            // stopProfilePhotoLoader();
        } else {
            //startProfilePhotoLoader();
        }

        if (fileFormates.indexOf(file && file.type) < 0) {
            setTimeout(() => {
                if (file && file.accepted === false) {
                    toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
                    this.dropzone.removeFile(file.name);
                    // stopProfilePhotoLoader();
                }
            }, 1000)
        }

        if (file && file.accepted === false) {
            setTimeout(() => {
                if (file && file.accepted === false) {
                    toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
                    this.dropzone.removeFile(file.name);
                    // stopProfilePhotoLoader();
                }
            }, 1000)
        }

        if (file && file.accepted === true) {
            setTimeout(() => {
                if (file && file.accepted === true) {
                   
                }
            }, 1000)
        }
    }

    render() {
        const { defaultMessage, className, subTextClass, subText, inputContainer, inputContainerClass } = this.props;
        const apiEndpoint = api && api.apiEndpoint;
        
        const djsConfig = {
            dictDefaultMessage: '',
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: maxUploadSize,
            acceptedFiles: 'image/jpeg,image/png, image/svg+xml, image/jpg',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false,
            hiddenInputContainer: inputContainer,
            timeout: 300000
            // maxFiles: 1
        };

        var componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.svg'],
            multiple: false,
            showFiletypeIcon: false,
            postUrl: apiEndpoint + '/uploadHomepageImage'
        };

        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };
        

        return (
            <div className={cx('listPhotoContainer')}>
                <div className={cx(inputContainerClass)}>
                    <div className={className}>
                        <DropzoneComponent
                            config={componentConfig}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig}
                        >
                            {defaultMessage}
                        </DropzoneComponent>
                    </div>
                </div>
                <p className={cx(subTextClass, 'droupText')}>
                {subText}: {maxUploadSize}MB
                </p>
            </div>

        )
    }
}

const mapState = state => ({});

const mapDispatch = {
    change,
    updateTempImages
};

export default withStyles(s)(connect(mapState, mapDispatch)(Dropzone));
