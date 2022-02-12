<template>
  <BaseModal name="credit-card">
    <CreditCard />
  </BaseModal>
</template>

<script>
import CreditCard from './CreditCard'
import BaseModal from '@/components/modals/BaseModal';

export default {
  name: 'CreditCardModal',
  components: {
    BaseModal,
    CreditCard,
  },
}
</script>