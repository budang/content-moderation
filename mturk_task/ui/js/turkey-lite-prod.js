var auditors = {
  "before_typing_delay": true,
  "clicks_specific": false,
  "clicks_total": true,
  "focus_changes": true,
  "focus_changes_total": true,
  "keypresses_specific": false,
  "keypresses_total": true,
  "mouse_movement_specific": false,
  "mouse_movement_total": true,
  "on_focus_time": true,
  "pastes_specific": false,
  "pastes_total": true,
  "recorded_time_disparity": true,
  "scrolled_pixels_specific": false,
  "scrolled_pixels_total": true,
  "total_task_time": true,
  "within_typing_delay": false,
  "url": true,
  "user_agent": true
}

/* https://rawgit.com/ */
var base = "https://cdn.rawgit.com/budang/turkey-lite/61b926c3/js/";
var promises =
  [$.getScript(base + "resources/jquery.ba-throttle-debounce.min.js"),
  $.getScript(base + "resources/visibility_changes.js")];

$.when.apply($, promises).then(function() {
  for (var name in auditors) {
    if (auditors[name])
      $.getScript(base + "auditors/" + name + ".js");
  }
});

