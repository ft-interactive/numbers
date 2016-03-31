'use strict';

exports.dashboard_data_url = (key, republish) => 
  'https://bertha.ig.ft.com/' + (republish ? 'republish' : 'view') + '/publish/gss/' + key + '/data,credits,groups,options';

exports.create_dashboard = spreadsheet => {

  spreadsheet.data.forEach(d => {
    d.charturl = d.charturl ? d.charturl.replace('ig.ft.com/graphics/bloomberg-economics', 'ig.ft.com/autograph/graphics') : '';
  });

  let options = spreadsheet.options.reduce(map_reduce_options, {});
  let cards = spreadsheet.data;
  let cards_by_group = cards.reduce(index_by_group, {});

  let dashboard = {};
  dashboard.groups = build_groups(spreadsheet.groups, cards_by_group);
  dashboard.credits = spreadsheet.credits;
  dashboard.title = options.title;
  dashboard.logo = options.logo;
  dashboard.introText = options.introText;
  dashboard.meta = {
    uuid: options.uuid && options.uuid.text,
    title: options.title && options.title.text,
    description: options.description && options.description.text,
    keywords: options.keywords && options.keywords.text.split(/, */g),
    og: {
      site_name: options['og:site_name'] && options['og:site_name'].text,
      title: options['og:title'] && options['og:title'].text,
      description: options['og:description'] && options['og:description'].text,
      image: options['og:image'] && options['og:image'].text
    }
  };

  return dashboard;
};

function map_reduce_options(o, row) {
  o[row.name] = {text: row.value, html: row.html || row.value};
  return o;
}

function index_by_group(index, row) {
  const id = row.group;
  if (index[id]) {
    index[id].push(row);
  } else {
    index[id] = [row];
  }
  return index;
}

function build_groups(groups, card_index) {
  return groups.map(function(group) {
    const id = group.id;
    const indicators = id && this[id];
    if (id && indicators) {
      group.cards = indicators.map(indicator=>{
        indicator.group = group;
        return indicator;
      });
    }
    return group;
  }, card_index);
}
