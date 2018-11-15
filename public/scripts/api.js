/* global $ */
'use strict';

const api = {

  search: function (query) {
    console.log('attempted to search')
    return $.ajax({
      type: 'GET',
      url: '/api/notes/',
      dataType: 'json',
      data: query,
    });
  },

  details: function (id) {
    console.log('attempted to details');
    return $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/api/notes/${id}`,
    });
  },

  update: function (id, obj) {
    console.log('attempted to up')
    return $.ajax({
      type: 'PUT',
      url: `/api/notes/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
    });
  },

  create: function (obj) {
    console.log('attempted to create')
    return $.ajax({
      type: 'POST',
      url: '/api/notes',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(obj),
    });
  },

  remove: function (id) {
    console.log('attempted to remove')
    return $.ajax({
      type: 'DELETE',
      url: `/api/notes/${id}`,
      dataType: 'json',
    });
  }

};