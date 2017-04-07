package cn.dbsec.core.shiro.cache.impl;

import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheException;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.util.Destroyable;

import cn.dbsec.core.shiro.cache.ShiroCacheManager;

/**
 * <p>
 * shiro Custom Cache
 * <p>
 * 
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　2016年4月29日 　<br/>
 * 
 * @author
 * @version 1.0,2016年4月29日 <br/>
 * 
 */
public class CustomShiroCacheManager implements CacheManager, Destroyable {

	private ShiroCacheManager shiroCacheManager;

	@Override
	public <K, V> Cache<K, V> getCache(String name) throws CacheException {
		return getShiroCacheManager().getCache(name);
	}

	@Override
	public void destroy() throws Exception {
		shiroCacheManager.destroy();
	}

	public ShiroCacheManager getShiroCacheManager() {
		return shiroCacheManager;
	}

	public void setShiroCacheManager(ShiroCacheManager shiroCacheManager) {
		this.shiroCacheManager = shiroCacheManager;
	}

}
