import Vue from 'vue';
import { formatPrice } from '@/helpers';

Vue.filter('formatPrice', (value) => formatPrice(value));