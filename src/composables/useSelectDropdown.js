import { ref, computed } from 'vue';

export function useSelectDropdown(initialModelValue, isOpenInitial) {
  const selectedValue = ref(initialModelValue);
  const isDropdownOpen = ref(isOpenInitial);

  // Получаем и обновляем состояние выбранной валюты
  const selected = computed({
    get() {
      return selectedValue.value;
    },
    set(value) {
      selectedValue.value = value;
    },
  });

  // Управление открытием/закрытием дропдауна
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  return {
    selected,
    isDropdownOpen,
    toggleDropdown,
  };
}
