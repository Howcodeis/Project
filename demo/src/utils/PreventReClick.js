export default {
  install (Vue) {
    Vue.directive('PreventReClick', {
      inserted (button, binding) {
        button.addEventListener('click', () => {
          if (!button.disabled) {
            button.disabled = true
            setTimeout(() => {
              button.disabled = false
            }, binding.value || 3000);
          }
        })
      }
    })
  }
}
