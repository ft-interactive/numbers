'use strict';

exports.dashboard_data_url = (key, republish) => 
  'http://bertha.ig.ft.com/' + (republish ? 'republish' : 'view') + '/publish/gss/' + key + '/data,credits,groups,options';

exports.create_dashboard = spreadsheet => {

  let options = spreadsheet.options.reduce(map_reduce_options, {});
  let cards = spreadsheet.data;
  let cards_by_group = cards.reduce(index_card_groups, {});

  let dashboard = {};
  dashboard.groups = build_groups(spreadsheet.groups, cards_by_group);
  dashboard.credits = spreadsheet.credits;
  dashboard.title = options.title;
  dashboard.logo = options.logo;
  dashboard.introText = options.introText;
  dashboard.meta = {
    title: options.title && options.title.text,
    description: options.description && options.description.text,
    keywords: options.keywords && options.keywords.text.split(/, */g),
    og: {
      site_name: options['og:site_name'] && options['og:site_name'].text,
      title: options['og:title'] && options['og:title'].text,
      description: options['og:description'] && options['og:description'].text,
      image: options['og:image'] && options['og:image'].text
    }
  }

  return dashboard;
};

// res.locals.dashboard = economies[economy].data;
//     res.locals.page = economies[economy].page;
// res.locals.dashboard = economies[economy].data = data;
//         res.locals.page = {
//           title: res.locals.dashboard.title + ' – FT.com',
//           description: res.locals.dashboard.description,
//           social: {
//             basic: {
//               title: '21 charts that explain the US economy',
//               description: res.locals.dashboard.description,
//             }
//           }
//         };

function map_reduce_options(o, row) {
  o[row.name] = {text: row.value, html: row.html || row.value};
  return o;
}

function index_card_groups(index, row) {
  let key = row.type;
  if (index[key]) {
    index[key].indicators.push(row);
  } else {
    index[key] = {
      name: row.category,
      type: row.type,
      indicators: [row],
      indexcard: row.indexcard
    };
  }
  return index;
}

function build_groups(groups, card_index) {
  return groups.map(function(row) {
    let type = row.type;
    if (type && this[type]) {
      let group = this[type];
      group.name = row.name || group.name;
      return group;
    } else {
      return row;
    }
  }, card_index);
}
