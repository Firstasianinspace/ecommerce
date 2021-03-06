import Vue from 'vue';
// import CustomInput from '@/components/common/CustomInput';
// import Icon from '@/components/common/Icon';
// import Radio from '@/components/common/Radio';
// import CustomSelect from '@/components/common/CustomSelect';
// import CustomSwitch from '@/components/common/CustomSwitch';
import { VueMaskDirective } from 'v-mask';
import CustomButton from '@/components/common/CustomButton';
import CustomImage from '@/components/common/CustomImage';
import CustomInput from '@/components/common/CustomInput';
// import CustomCheckbox from '@/components/common/CustomCheckbox';
// import LayoutDialog from '@/components/layout/LayoutDialog';
// import CustomTextarea from '@/components/common/CustomTextarea';
// import CustomInputFile from '@/components/common/CustomInputFile';
// import CustomInputPassword from '@/components/common/CustomInputPassword';
// import CustomInputPhone from '@/components/common/CustomInputPhone';
// import CustomInputLogin from '@/components/common/CustomInputLogin';
// import CustomInputCode from '@/components/common/CustomInputCode';
// import FetchStateManager from '@/components/common/FetchStateManager';
// import FetchPreload from '@/components/common/FetchPreload';
// import AlertMessage from '@/components/common/AlertMessage';
// import AppLink from '@/components/common/AppLink';
import loading from '@/directives/loading';
import lazyload from '@/directives/lazyload';
import Property from '@/components/common/Property'
// import RecaptchaProvider from '@/components/common/RecaptchaProvider';
// import IntersectionObserver from '@/components/common/IntersectionObserver';
// import ScrollObserver from '@/components/common/ScrollObserver';
// import StatisticsIntersectionObserver from '@/components/common/StatisticsIntersectionObserver';


Vue.directive('mask', VueMaskDirective);
Vue.directive('loading', loading);
Vue.directive('lazyload', lazyload);

// Vue.component('custom-input', CustomInput);
// Vue.component('custom-input-file', CustomInputFile);
// Vue.component('custom-input-password', CustomInputPassword);
// Vue.component('custom-input-phone', CustomInputPhone);
// Vue.component('custom-input-login', CustomInputLogin);
// Vue.component('custom-input-code', CustomInputCode);
// Vue.component('icon', Icon);
// Vue.component('radio', Radio);
// Vue.component('app-link', AppLink);
// Vue.component('custom-select', CustomSelect);
// Vue.component('custom-switch', CustomSwitch);
// Vue.component('custom-textarea', CustomTextarea);
Vue.component('Property', Property);
Vue.component('CustomButton', CustomButton);
Vue.component('CustomInput', CustomInput);
Vue.component('CustomImage', CustomImage);
// Vue.component('custom-checkbox', CustomCheckbox);
// Vue.component('intersection-observer', IntersectionObserver);
// Vue.component('scroll-observer', ScrollObserver);

// Vue.component('LayoutDialog', LayoutDialog);
