module ApplicationHelper
  def react_component(name, props)
    content_tag(:div, { id: name, data: { props: props } }) do
    end
  end
end
