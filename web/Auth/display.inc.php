<?php
   global $_GPC, $_W;
$_W = self::$_W;

$act = isset(self::$_GPC['act']) ? self::$_GPC['act'] : '';



if($act == ''){



//    $sql = "SELECT * FROM ".tablename('sudu8_page_mcategory')." ORDER BY sort DESC";

//    $list = pdo_fetchall($sql);

//

//    $list = \Core\vender\Factory::array_to_tree($list,0);

//

//    return include self::template('web/Auth/index');

    $sql = "SELECT uid FROM ".tablename('sudu8_page_muser')." WHERE `uniacid` = ".self::$_W['uniacid'];

    $uid = pdo_fetchall($sql);


    $sql = "SELECT uid FROM ".tablename('users_permission')." WHERE `uniacid` = ".self::$_W['uniacid']." AND `type` = 'sudu8_page'";

    $perminion = pdo_fetchall($sql);

    $uids = [];

    if($perminion){

        foreach ($perminion as $k => $v){

            $uids[] = $v['uid'];

        }

    }

    if($uids){

        foreach ($uid as $k => $v){

            $uids[] = $v['uid'];

        }

        // $sql = "SELECT a.*,b.*,b.name as groupname FROM ".tablename('users')." AS a LEFT JOIN ".tablename('users_group')." AS b ON a.groupid = b.id WHERE uid IN (".implode(',',$uids).")";
        
        $total = pdo_fetchcolumn("SELECT count(*) FROM ".tablename('users')." as a left join" .tablename('sudu8_page_usergroup')." as b ON a.gid = b.id WHERE a.uid IN (".implode(',',$uids).")");

        $pageindex = max(1, intval($_GPC['page']));
        $pagesize = 10;  
        $start = ($pageindex-1) * $pagesize;
        $pager = pagination($total, $pageindex, $pagesize);  
        $sql = "SELECT a.*,b.*,b.name as groupname FROM ".tablename('users')." AS a LEFT JOIN ".tablename('sudu8_page_usergroup')." AS b ON a.gid = b.id WHERE a.uid IN (".implode(',',$uids).") ORDER BY id DESC LIMIT ".$start.",".$pagesize;

        $user = pdo_fetchall($sql);

    }

    return include self::template('web/Auth/userlist');

}

