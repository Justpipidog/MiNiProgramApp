<?php
 goto dNJWu; dNJWu: global $_GPC, $_W; goto fWMwT; KZUPj: Vq90q: goto AchnF; fWMwT: $uniacid = $_W["\x75\x6e\x69\141\143\x69\144"]; goto blQgJ; c8X9T: $orders = pdo_fetchall("\123\105\x4c\105\103\124\x20\x61\56\x6f\162\144\145\162\151\x64\54\x61\x2e\x70\x61\x79\x6d\x6f\156\145\171\54\141\56\143\162\x65\x61\x74\164\151\x6d\145\x2c\x62\56\x74\x69\164\154\x65\54\x63\56\x6e\x69\143\153\x6e\141\x6d\x65\x2c\143\56\141\166\141\x74\x61\x72\40\106\122\117\x4d\40" . tablename("\x73\165\144\x75\70\x5f\x70\141\147\145\137\x76\151\x64\x65\x6f\x5f\x70\x61\171") . "\x20\141\x73\x20\141\x20\x4c\x45\x46\124\x20\112\117\x49\x4e\40" . tablename("\163\x75\x64\x75\70\137\160\x61\x67\145\137\x70\162\x6f\144\x75\143\164\x73") . "\x20\x61\163\x20\x62\40\157\156\40\x61\56\160\151\144\40\x3d\x20\142\56\x69\x64\x20\x4c\105\x46\x54\x20\112\117\111\x4e\x20" . tablename("\163\165\x64\x75\x38\137\x70\141\x67\x65\137\x75\x73\145\162") . "\x20\x61\163\40\143\x20\157\156\x20\141\56\157\160\x65\156\151\x64\40\75\x20\x63\56\x6f\160\145\156\151\144\x20\127\x48\105\x52\105\40\x61\56\165\156\x69\141\143\151\x64\40\75\x20\x3a\x75\x6e\151\x61\143\x69\x64\x20\x61\x6e\x64\x20\x63\56\x75\156\x69\141\143\x69\144\x20\x3d\40\72\165\x6e\x69\141\143\151\x64\x20\x4f\x52\104\105\x52\40\x42\131\40\x61\x2e\143\162\145\x61\164\x74\151\x6d\145\40\x44\x45\123\103\40\114\x49\115\x49\x54\40" . $p . "\x2c" . $pagesize, array("\x3a\165\156\x69\141\143\151\x64" => $uniacid)); goto O9YZ4; lPiAI: $pageindex = max(1, intval($_GPC["\x70\x61\x67\145"])); goto TGhDM; J5BJJ: $p = ($pageindex - 1) * $pagesize; goto KupcJ; KupcJ: $pager = pagination($total, $pageindex, $pagesize); goto c8X9T; wTbOu: $total = count($all); goto lPiAI; O9YZ4: foreach ($orders as &$res) { $res["\143\162\x65\x61\164\164\151\x6d\x65"] = date("\x59\x2d\x6d\55\144\40\x48\72\x69\72\x73", $res["\x63\x72\145\141\164\x74\151\x6d\x65"]); hTX_e: } goto KZUPj; blQgJ: $all = pdo_fetchall("\123\105\114\x45\103\124\40\x69\x64\x20\106\x52\117\x4d\x20" . tablename("\163\x75\144\165\70\x5f\x70\141\x67\x65\137\166\x69\144\145\x6f\137\160\x61\x79") . "\40\127\110\105\122\x45\40\x75\156\x69\x61\143\151\x64\x20\75\40\x3a\165\x6e\x69\x61\143\151\144\40\x20\x4f\122\104\x45\122\x20\x42\x59\x20\140\x63\162\x65\x61\x74\x74\x69\155\145\x60\40\104\x45\x53\x43\40", array("\72\165\x6e\151\x61\x63\151\144" => $uniacid)); goto wTbOu; TGhDM: $pagesize = 10; goto J5BJJ; AchnF: return include self::template("\167\x65\142\x2f\117\x72\x64\145\x72\163\145\164\57\x76\151\144\145\x6f\x6f\x72\144\x65\162");