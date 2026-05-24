import React from 'react';
import {TouchableOpacity, ViewStyle, StyleProp} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  filled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const iconMap: Record<string, string> = {
  school: 'school',
  mail: 'mail-outline',
  lock: 'lock-outline',
  visibility_off: 'visibility-off',
  visibility: 'visibility',
  search: 'search',
  arrow_forward: 'arrow-forward',
  home: 'home',
  menu_book: 'menu-book',
  calendar_month: 'calendar-month',
  notifications: 'notifications',
  person: 'person',
  add: 'add',
  auto_stories: 'auto-stories',
  notifications_off: 'notifications-off',
  chevron_right: 'chevron-right',
  error: 'error-outline',
  architecture: 'architecture',
  code: 'code',
  lock_reset: 'lock-reset',
  content_copy: 'content-copy',
  warning: 'warning-amber',
  attachment: 'attach-file',
  forum: 'forum',
  check_circle: 'check-circle',
  schedule: 'schedule',
  circle: 'circle',
  article: 'article',
  groups: 'groups',
  email: 'email',
  phone: 'phone',
  location_on: 'location-on',
  settings: 'settings',
  help: 'help-outline',
  logout: 'logout',
  segment: 'segment',
  psychology: 'psychology',
  memory: 'memory',
  science: 'science',
  history: 'history',
  expand_more: 'expand-more',
  filter_list: 'filter-list',
  trending_up: 'trending-up',
  pie_chart: 'pie-chart',
  playlist_add_check: 'playlist-add-check',
  description: 'description',
  done: 'done',
  close: 'close',
  mic: 'mic',
  send: 'send',
  image: 'image',
  more_vert: 'more-vert',
  grade: 'grade',
  campaign: 'campaign',
  done_all: 'done-all',
  chevron_left: 'chevron-left',
  arrow_back: 'arrow-back',
};

export default function Icon({
  name,
  size = 24,
  color = colors.onSurfaceVariant,
  filled: _filled = false,
  style,
}: IconProps) {
  const mappedName = iconMap[name] || name;

  return (
    <TouchableOpacity disabled style={style}>
      <MaterialIcons name={mappedName} size={size} color={color} />
    </TouchableOpacity>
  );
}
