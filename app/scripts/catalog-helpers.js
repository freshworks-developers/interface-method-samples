(function () {
  function row(buttonsHtml) {
    return '<div class="btn-row">' + buttonsHtml + '</div>';
  }

  function btn(label, onclick) {
    return '<fw-button size="small" color="secondary" onclick="' + onclick + '">' + label + '</fw-button>';
  }

  function section(title, badge, desc, buttonsHtml) {
    return (
      '<section class="section">' +
      '<span class="badge">' + badge + '</span>' +
      '<h3>' + title + '</h3>' +
      '<p class="section-desc">' + desc + '</p>' +
      buttonsHtml +
      '</section>'
    );
  }

  function accordion(location, subtitle, contentHtml, expanded) {
    const openAttr = expanded ? ' open' : '';
    const subtitleHtml = subtitle
      ? '<p class="panel-subtitle">' + subtitle + '</p>'
      : '';
    return (
      '<details class="catalog-panel"' + openAttr + '>' +
      '<summary class="catalog-panel-title">' + location + '</summary>' +
      '<div class="catalog-panel-body">' +
      subtitleHtml +
      contentHtml +
      '</div>' +
      '</details>'
    );
  }

  function buttonGroup(label, contentHtml) {
    return (
      '<div class="button-group">' +
      '<p class="button-group-label">' + label + '</p>' +
      contentHtml +
      '</div>'
    );
  }

  function groupHeading(label) {
    return '<p class="group-heading">' + label + '</p>';
  }

  function visibilityActions(id) {
    const safe = id.replace(/'/g, "\\'");
    return row(
      btn('Show', "InterfaceKit.toggle('show','" + safe + "')") +
      btn('Hide', "InterfaceKit.toggle('hide','" + safe + "')")
    );
  }

  function elementActions(id) {
    const safe = id.replace(/'/g, "\\'");
    return row(
      btn('Show', "InterfaceKit.toggle('show','" + safe + "')") +
      btn('Hide', "InterfaceKit.toggle('hide','" + safe + "')") +
      btn('Enable', "InterfaceKit.toggle('enable','" + safe + "')") +
      btn('Disable', "InterfaceKit.toggle('disable','" + safe + "')")
    );
  }

  function visibilityGroup(id, label) {
    return buttonGroup(label, visibilityActions(id));
  }

  function elementGroup(id, label) {
    return buttonGroup(label, elementActions(id));
  }

  window.CatalogHelpers = {
    row: row,
    btn: btn,
    section: section,
    accordion: accordion,
    buttonGroup: buttonGroup,
    groupHeading: groupHeading,
    visibilityActions: visibilityActions,
    elementActions: elementActions,
    visibilityGroup: visibilityGroup,
    elementGroup: elementGroup
  };
})();
