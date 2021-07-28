import conditions from '@/assets/js/conditions';

export default function (condition) {
  return conditions[condition.type].content(condition.tm);
}
