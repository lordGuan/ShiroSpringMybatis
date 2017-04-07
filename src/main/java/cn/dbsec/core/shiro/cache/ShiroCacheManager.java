package cn.dbsec.core.shiro.cache;

import org.apache.shiro.cache.Cache;

/**
 * <p>
 * shiro cache manager 接口
 * <p>
 * 
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　　2016年6月2日 　<br/>
 * 
 * @author
 * @version 1.0,2016年6月2日 <br/>
 * 
 */
public interface ShiroCacheManager {

	<K, V> Cache<K, V> getCache(String name);

	void destroy();

}
