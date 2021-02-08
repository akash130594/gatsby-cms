import React from 'react'
import CMS from 'netlify-cms-app'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { ComponentsPageTemplate } from '../templates/ComponentsPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { DefaultPageTemplate } from '../templates/DefaultPage'
import { BlogIndexTemplate } from '../templates/BlogIndex'
import { SinglePostTemplate } from '../templates/SinglePost'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary';

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('components-page', ({ entry }) => (
  <ComponentsPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('infoPages', ({ entry }) => (
  <DefaultPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
  <BlogIndexTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePostTemplate {...entry.toJS().data} />
))
CMS.registerEditorComponent({
  // Internal id of the component
  id: "imageGallery",
  // Visible label
  label: "Image Gallery",
  // Fields the user need to fill out when adding an instance of the component
  fields: [{name: 'gallery', label: 'Blog Image Gallery', widget: 'list', fields: [
              { name: 'image', label: 'Image', widget: 'image' },
              { name: 'alt', label: 'Alt', widget: 'string' },
              { name: 'title', label: 'Title', widget: 'string', required: false }] }],
  // Pattern to identify a block as being an instance of this component
  // pattern: /^youtube (\S+)$/,
  // // Function to extract data elements from the regexp match
  // fromBlock: function(match) {
  //   return {
  //     id: match[1]
  //   };
  // },
  // Function to create a text block from an instance of this component
  // toBlock: function(obj) {
  //   return 'youtube ' + obj.id;
  // },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<img src="http://img.youtube.com/vi/' + obj.id + '/maxresdefault.jpg" alt="Youtube Video"/>'
    );
  }
});
